// src\components\common\DynamicEditModal.tsx
"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { X, Save, Upload, Trash2, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type {
  GenericDataItem,
  FormFieldConfig,
  EditModalConfig,
} from "../../types/dynamicTableTypes";

interface DynamicEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: GenericDataItem | null;
  onSave: (updatedItem: GenericDataItem) => void;
  fieldConfigs: FormFieldConfig[];
  modalConfig?: EditModalConfig;
  isLoading?: boolean;
}

export const DynamicEditModal: React.FC<DynamicEditModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  fieldConfigs,
  modalConfig = {},
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<GenericDataItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>(
    {}
  );
  const [filePreviewUrls, setFilePreviewUrls] = useState<
    Record<string, string[]>
  >({});

  // Initialize form data when item changes
  useEffect(() => {
    if (item) {
      setFormData({ ...item });
      setErrors({});
      setUploadedFiles({});
      setFilePreviewUrls({});
    }
  }, [item]);

  // Handle input changes
  const handleInputChange = (key: string, value: unknown) => {
    if (!formData) return;

    setFormData((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [key]: value };

      // Apply transform if defined
      const fieldConfig = fieldConfigs.find((config) => config.key === key);
      if (fieldConfig?.transform) {
        updated[key] = fieldConfig.transform(value);
      }

      return updated;
    });

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Record<string, string> = {};

    fieldConfigs.forEach((config) => {
      const value = formData[config.key];

      // Required validation
      if (
        config.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
      ) {
        newErrors[config.key] = `${config.label} is required`;
        return;
      }

      // Skip validation if field is empty and not required
      if (!value) return;

      // Type-specific validation
      if (config.validation) {
        const { min, max, minLength, maxLength, pattern, custom } =
          config.validation;

        if (typeof value === "string") {
          if (minLength && value.length < minLength) {
            newErrors[
              config.key
            ] = `${config.label} must be at least ${minLength} characters`;
          }
          if (maxLength && value.length > maxLength) {
            newErrors[
              config.key
            ] = `${config.label} must be no more than ${maxLength} characters`;
          }
          if (pattern && !new RegExp(pattern).test(value)) {
            newErrors[config.key] = `${config.label} format is invalid`;
          }
        }

        if (typeof value === "number") {
          if (min !== undefined && value < min) {
            newErrors[config.key] = `${config.label} must be at least ${min}`;
          }
          if (max !== undefined && value > max) {
            newErrors[
              config.key
            ] = `${config.label} must be no more than ${max}`;
          }
        }

        // Custom validation
        if (custom) {
          const customError = custom(value);
          if (customError) {
            newErrors[config.key] = customError;
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload
  const handleFileUpload = (fieldKey: string, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5);
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), ...newFiles].slice(0, 5),
    }));

    // Create preview URLs
    newFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setFilePreviewUrls((prev) => ({
        ...prev,
        [fieldKey]: [...(prev[fieldKey] || []), url].slice(0, 5),
      }));
    });
  };

  // Remove file
  const removeFile = (fieldKey: string, index: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldKey]: prev[fieldKey]?.filter((_, i) => i !== index) || [],
    }));

    setFilePreviewUrls((prev) => {
      const urls = prev[fieldKey] || [];
      if (urls[index]) {
        URL.revokeObjectURL(urls[index]);
      }
      return {
        ...prev,
        [fieldKey]: urls.filter((_, i) => i !== index),
      };
    });
  };

  // Handle save
  const handleSave = async () => {
    if (!formData || !validateForm()) return;

    // Add uploaded files to form data
    const finalData = { ...formData };
    Object.keys(uploadedFiles).forEach((key) => {
      if (uploadedFiles[key].length > 0) {
        finalData[key] = uploadedFiles[key];
      }
    });

    onSave(finalData);
  };

  // Handle close
  const handleClose = () => {
    setFormData(null);
    setErrors({});
    setUploadedFiles({});

    // Clean up preview URLs
    Object.values(filePreviewUrls)
      .flat()
      .forEach((url) => {
        URL.revokeObjectURL(url);
      });
    setFilePreviewUrls({});
    onClose();
  };

  // Render form field based on type
  const renderFormField = (config: FormFieldConfig) => {
    if (!formData) return null;

    // Check if field should be shown
    if (config.showWhen && !config.showWhen(formData)) {
      return null;
    }

    const value = formData[config.key];
    const hasError = errors[config.key];
    const fieldId = `field-${config.key}`;

    const renderInput = () => {
      switch (config.type) {
        case "textarea":
          return (
            <Textarea
              id={fieldId}
              value={value?.toString() || ""}
              onChange={(e) => handleInputChange(config.key, e.target.value)}
              placeholder={config.placeholder}
              className={cn(
                "min-h-[100px] resize-y",
                hasError && "border-red-500 focus:border-red-500",
                config.className
              )}
            />
          );

        case "select":
          return (
            <Select
              value={value?.toString() || ""}
              onValueChange={(val) => handleInputChange(config.key, val)}
            >
              <SelectTrigger
                id={fieldId}
                className={cn(
                  hasError && "border-red-500 focus:border-red-500",
                  config.className
                )}
              >
                <SelectValue
                  placeholder={config.placeholder || `Select ${config.label}`}
                />
              </SelectTrigger>
              <SelectContent>
                {config.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.color && (
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );

        case "multiselect":
          const selectedValues = Array.isArray(value) ? value : [];
          return (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedValues.map((val: string) => {
                  const option = config.options?.find(
                    (opt) => opt.value === val
                  );
                  return (
                    <Badge
                      key={val}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {option?.color && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      {option?.label || val}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => {
                          const newValues = selectedValues.filter(
                            (v) => v !== val
                          );
                          handleInputChange(config.key, newValues);
                        }}
                      />
                    </Badge>
                  );
                })}
              </div>
              <Select
                onValueChange={(val) => {
                  if (!selectedValues.includes(val)) {
                    handleInputChange(config.key, [...selectedValues, val]);
                  }
                }}
              >
                <SelectTrigger className={cn(hasError && "border-red-500")}>
                  <SelectValue
                    placeholder={config.placeholder || `Add ${config.label}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {config.options
                    ?.filter((opt) => !selectedValues.includes(opt.value))
                    .map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.color && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: option.color }}
                            />
                          )}
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          );

        case "checkbox":
          return (
            <div className="flex items-center space-x-2">
              <Checkbox
                id={fieldId}
                checked={Boolean(value)}
                onCheckedChange={(checked) =>
                  handleInputChange(config.key, checked)
                }
                className={cn(hasError && "border-red-500")}
              />
              <Label htmlFor={fieldId} className="text-sm font-normal">
                {config.placeholder || config.label}
              </Label>
            </div>
          );

        case "radio":
          return (
            <div className={cn("flex flex-col space-y-2", config.className)}>
              {config.options?.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`${fieldId}-${option.value}`}
                    name={fieldId}
                    value={option.value}
                    checked={value?.toString() === option.value}
                    onChange={(e) =>
                      handleInputChange(config.key, e.target.value)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <Label
                    htmlFor={`${fieldId}-${option.value}`}
                    className="text-sm font-normal"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          );

        case "file":
          const fieldPreviews = filePreviewUrls[config.key] || [];
          return (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(config.key, e.target.files)}
                  className="hidden"
                  id={fieldId}
                />
                <label htmlFor={fieldId} className="cursor-pointer">
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <span className="text-blue-600 font-medium">
                        Browse files
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {config.placeholder || "Max file size 50MB"}
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              {fieldPreviews.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {fieldPreviews.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Upload ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        width={80}
                        height={80}
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(config.key, index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );

        case "readonly":
          return (
            <Input
              id={fieldId}
              value={value?.toString() || ""}
              readOnly
              className={cn("bg-gray-50 cursor-not-allowed", config.className)}
            />
          );

        case "currency":
          return (
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <Input
                id={fieldId}
                type="number"
                step="0.01"
                value={value?.toString() || ""}
                onChange={(e) =>
                  handleInputChange(
                    config.key,
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder={config.placeholder}
                className={cn(
                  "pl-8",
                  hasError && "border-red-500 focus:border-red-500",
                  config.className
                )}
              />
            </div>
          );

        case "percentage":
          return (
            <div className="relative">
              <Input
                id={fieldId}
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={value?.toString() || ""}
                onChange={(e) =>
                  handleInputChange(
                    config.key,
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder={config.placeholder}
                className={cn(
                  "pr-8",
                  hasError && "border-red-500 focus:border-red-500",
                  config.className
                )}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                %
              </span>
            </div>
          );

        default:
          return (
            <Input
              id={fieldId}
              type={config.type}
              value={value?.toString() || ""}
              onChange={(e) => {
                let newValue: string | number = e.target.value;
                if (config.type === "number") {
                  newValue = Number.parseFloat(newValue) || 0;
                }
                handleInputChange(config.key, newValue);
              }}
              placeholder={config.placeholder}
              className={cn(
                hasError && "border-red-500 focus:border-red-500",
                config.className
              )}
            />
          );
      }
    };

    return (
      <div className="space-y-2">
        {config.type !== "checkbox" && (
          <Label htmlFor={fieldId} className="text-sm font-medium">
            {config.label}
            {config.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        {renderInput()}
        {hasError && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <X className="w-3 h-3" />
            {hasError}
          </p>
        )}
      </div>
    );
  };

  // Group fields by section
  const fieldsBySection = fieldConfigs.reduce((acc, config) => {
    const section = config.section || "main";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(config);
    return acc;
  }, {} as Record<string, FormFieldConfig[]>);

  if (!formData) return null;

  const modalWidth = {
    sm: "min-w-md",
    md: "min-w-lg",
    lg: "min-w-2xl",
    xl: "min-w-4xl",
    "2xl": "max-w-6xl",
    full: "min-w-full",
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto scrollbar-custom",
          modalWidth[modalConfig.width || "lg"]
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {formData.avatar && (
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={formData.avatar || "/placeholder.svg"}
                  alt={formData.name || "User"}
                />
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            {modalConfig.title || "Edit Item"}
          </DialogTitle>
          <DialogDescription>
            {modalConfig.description || "Update the information below."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(fieldsBySection).map(
            ([sectionKey, sectionFields]) => {
              const sectionConfig = modalConfig.sections?.find(
                (s) => s.key === sectionKey
              );

              return (
                <div
                  key={sectionKey}
                  className={cn("space-y-4", sectionConfig?.className)}
                >
                  {sectionConfig && (
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">
                        {sectionConfig.title}
                      </h3>
                      {sectionConfig.description && (
                        <p className="text-sm text-gray-600">
                          {sectionConfig.description}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid gap-4">
                    {sectionFields.map((config) => {
                      const gridClass = {
                        full: "col-span-full",
                        half: "col-span-1 md:col-span-1",
                        third: "col-span-1 md:col-span-1",
                        quarter: "col-span-1",
                      };

                      return (
                        <div
                          key={config.key}
                          className={cn(
                            "grid grid-cols-1 md:grid-cols-2 gap-4",
                            config.gridCol === "full" && "md:grid-cols-1",
                            config.gridCol === "third" && "md:grid-cols-3",
                            config.gridCol === "quarter" && "md:grid-cols-4"
                          )}
                        >
                          <div className={gridClass[config.gridCol || "half"]}>
                            {renderFormField(config)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          )}
        </div>

        <DialogFooter className="flex justify-end gap-3 pt-6 border-t">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
