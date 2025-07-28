"use client";

import type React from "react";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DynamicTable } from "../../components/common/DynamicTable";
import type {
  GenericDataItem,
  ColumnConfig,
  FormFieldConfig,
  ActionConfig,
  TableConfig,
} from "../../types/dynamicTableTypes";
import {
  Eye,
  Edit,
  Star,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  Award,
  MapPin,
} from "lucide-react";

// Employee Management Data
const employeeData: GenericDataItem[] = [
  {
    id: "emp1",
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    email: "john.doe@company.com",
    phone: "+1-555-0123",
    role: "admin",
    status: "active",
    salary: 85000,
    department: "Engineering",
    joinDate: "2023-01-15",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    isActive: true,
    performance: 95,
    location: "New York",
  },
  {
    id: "emp2",
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    email: "jane.smith@company.com",
    phone: "+1-555-0124",
    role: "manager",
    status: "active",
    salary: 95000,
    department: "Design",
    joinDate: "2022-08-20",
    skills: ["Figma", "Photoshop", "UI/UX", "Prototyping"],
    isActive: true,
    performance: 88,
    location: "San Francisco",
  },
  {
    id: "emp3",
    name: "Bob Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=BJ",
    email: "bob.johnson@company.com",
    phone: "+1-555-0125",
    role: "user",
    status: "inactive",
    salary: 75000,
    department: "Marketing",
    joinDate: "2023-03-10",
    skills: ["SEO", "Content Marketing", "Analytics"],
    isActive: false,
    performance: 72,
    location: "Chicago",
  },
];

// Product Management Data
const productData: GenericDataItem[] = [
  {
    id: "prod1",
    name: "Wireless Headphones",
    category: "electronics",
    price: 199.99,
    stock: 150,
    status: "active",
    rating: 4.5,
    reviews: 1250,
    brand: "TechCorp",
    sku: "WH-001",
    weight: "0.3kg",
    dimensions: "20x15x8cm",
    tags: ["wireless", "bluetooth", "noise-canceling"],
    featured: true,
    createdDate: "2023-01-15",
  },
  {
    id: "prod2",
    name: "Smart Watch",
    category: "wearables",
    price: 299.99,
    stock: 75,
    status: "active",
    rating: 4.2,
    reviews: 890,
    brand: "WearTech",
    sku: "SW-002",
    weight: "0.05kg",
    dimensions: "4x4x1cm",
    tags: ["fitness", "health", "notifications"],
    featured: false,
    createdDate: "2023-02-20",
  },
  {
    id: "prod3",
    name: "Gaming Laptop",
    category: "computers",
    price: 1299.99,
    stock: 25,
    status: "low-stock",
    rating: 4.8,
    reviews: 456,
    brand: "GameTech",
    sku: "GL-003",
    weight: "2.5kg",
    dimensions: "35x25x3cm",
    tags: ["gaming", "high-performance", "RGB"],
    featured: true,
    createdDate: "2023-03-05",
  },
];

// Customer Data
const customerData: GenericDataItem[] = [
  {
    id: "cust1",
    name: "Alice Cooper",
    avatar: "/placeholder.svg?height=40&width=40&text=AC",
    email: "alice.cooper@email.com",
    phone: "+1-555-1001",
    status: "premium",
    totalOrders: 15,
    totalSpent: 2450.75,
    joinDate: "2022-06-15",
    location: "Los Angeles",
    segment: "high-value",
    lastOrder: "2024-01-10",
    preferredPayment: "credit-card",
    isActive: true,
  },
  {
    id: "cust2",
    name: "David Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    email: "david.wilson@email.com",
    phone: "+1-555-1002",
    status: "regular",
    totalOrders: 8,
    totalSpent: 890.25,
    joinDate: "2023-02-20",
    location: "Miami",
    segment: "regular",
    lastOrder: "2024-01-05",
    preferredPayment: "paypal",
    isActive: true,
  },
];

// Order Data
const orderData: GenericDataItem[] = [
  {
    id: "ord1",
    orderNumber: "ORD-2024-001",
    customerName: "Alice Cooper",
    status: "delivered",
    total: 299.99,
    items: 2,
    orderDate: "2024-01-10",
    deliveryDate: "2024-01-15",
    paymentMethod: "credit-card",
    shippingAddress: "123 Main St, Los Angeles, CA",
    priority: "high",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ord2",
    orderNumber: "ORD-2024-002",
    customerName: "David Wilson",
    status: "processing",
    total: 199.99,
    items: 1,
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-18",
    paymentMethod: "paypal",
    shippingAddress: "456 Oak Ave, Miami, FL",
    priority: "medium",
    trackingNumber: "TRK123456790",
  },
];

// Project Data
const projectData: GenericDataItem[] = [
  {
    id: "proj1",
    name: "E-commerce Platform",
    status: "in-progress",
    priority: "high",
    progress: 75,
    startDate: "2023-10-01",
    endDate: "2024-02-15",
    budget: 150000,
    spent: 112500,
    teamSize: 8,
    client: "RetailCorp",
    manager: "Jane Smith",
    tags: ["web", "react", "nodejs"],
    phase: "development",
  },
  {
    id: "proj2",
    name: "Mobile App Redesign",
    status: "completed",
    priority: "medium",
    progress: 100,
    startDate: "2023-08-15",
    endDate: "2023-12-20",
    budget: 80000,
    spent: 78000,
    teamSize: 5,
    client: "MobileTech",
    manager: "Bob Johnson",
    tags: ["mobile", "ui/ux", "flutter"],
    phase: "completed",
  },
];

export default function TableExamplesPage() {
  // Employee Table Configuration
  const employeeColumns: ColumnConfig[] = [
    {
      key: "name",
      label: "Employee",
      sortable: true,
      searchable: true,
      showAvatar: true,
      width: "250px",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      sortable: true,
      searchable: true,
    },
    {
      key: "role",
      label: "Role",
      type: "select",
      sortable: true,
      options: [
        { value: "admin", label: "Admin", color: "#ef4444" },
        { value: "manager", label: "Manager", color: "#f59e0b" },
        { value: "user", label: "User", color: "#3b82f6" },
      ],
    },
    {
      key: "department",
      label: "Department",
      sortable: true,
      searchable: true,
    },
    {
      key: "salary",
      label: "Salary",
      type: "currency",
      sortable: true,
      align: "right",
    },
    {
      key: "performance",
      label: "Performance",
      type: "percentage",
      sortable: true,
      align: "center",
      render: (value) => {
        const numValue = Number(value) || 0;
        return (
          <div className="flex items-center gap-2">
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${numValue}%` }}
              />
            </div>
            <span className="text-sm">{numValue}%</span>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      options: [
        { value: "active", label: "Active", color: "#10b981" },
        { value: "inactive", label: "Inactive", color: "#f59e0b" },
      ],
    },
  ];

  const employeeFormFields: FormFieldConfig[] = [
    {
      key: "name",
      label: "Full Name",
      type: "text",
      required: true,
      section: "personal",
      gridCol: "half",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      required: true,
      section: "personal",
      gridCol: "half",
    },
    {
      key: "phone",
      label: "Phone",
      type: "tel",
      section: "personal",
      gridCol: "half",
    },
    {
      key: "avatar",
      label: "Profile Picture",
      type: "file",
      section: "personal",
      gridCol: "full",
    },
    {
      key: "role",
      label: "Role",
      type: "select",
      required: true,
      section: "work",
      gridCol: "half",
      options: [
        { value: "admin", label: "Admin" },
        { value: "manager", label: "Manager" },
        { value: "user", label: "User" },
      ],
    },
    {
      key: "department",
      label: "Department",
      type: "select",
      required: true,
      section: "work",
      gridCol: "half",
      options: [
        { value: "Engineering", label: "Engineering" },
        { value: "Design", label: "Design" },
        { value: "Marketing", label: "Marketing" },
        { value: "Sales", label: "Sales" },
      ],
    },
    {
      key: "salary",
      label: "Salary",
      type: "currency",
      required: true,
      section: "work",
      gridCol: "half",
    },
    {
      key: "performance",
      label: "Performance (%)",
      type: "percentage",
      section: "work",
      gridCol: "half",
    },
  ];

  // Product Table Configuration
  const productColumns: ColumnConfig[] = [
    {
      key: "name",
      label: "Product",
      sortable: true,
      searchable: true,
      width: "200px",
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      sortable: true,
      options: [
        { value: "electronics", label: "Electronics", color: "#3b82f6" },
        { value: "wearables", label: "Wearables", color: "#10b981" },
        { value: "computers", label: "Computers", color: "#f59e0b" },
      ],
    },
    {
      key: "price",
      label: "Price",
      type: "currency",
      sortable: true,
      align: "right",
    },
    {
      key: "stock",
      label: "Stock",
      sortable: true,
      align: "center",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            Number(value) > 100
              ? "bg-green-100 text-green-800"
              : Number(value) > 50
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {String(value || 0)}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      align: "center",
      render: (value) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{String(value || 0)}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      options: [
        { value: "active", label: "Active", color: "#10b981" },
        { value: "low-stock", label: "Low Stock", color: "#f59e0b" },
        { value: "out-of-stock", label: "Out of Stock", color: "#ef4444" },
      ],
    },
  ];

  // Customer Table Configuration
  const customerColumns: ColumnConfig[] = [
    {
      key: "name",
      label: "Customer",
      sortable: true,
      searchable: true,
      showAvatar: true,
      width: "200px",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      sortable: true,
      searchable: true,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      options: [
        { value: "premium", label: "Premium", color: "#8b5cf6" },
        { value: "regular", label: "Regular", color: "#3b82f6" },
        { value: "inactive", label: "Inactive", color: "#6b7280" },
      ],
    },
    {
      key: "totalOrders",
      label: "Orders",
      sortable: true,
      align: "center",
    },
    {
      key: "totalSpent",
      label: "Total Spent",
      type: "currency",
      sortable: true,
      align: "right",
    },
    {
      key: "location",
      label: "Location",
      sortable: true,
      searchable: true,
    },
    {
      key: "lastOrder",
      label: "Last Order",
      type: "date",
      sortable: true,
    },
  ];

  // Order Table Configuration
  const orderColumns: ColumnConfig[] = [
    {
      key: "orderNumber",
      label: "Order #",
      sortable: true,
      searchable: true,
      width: "150px",
    },
    {
      key: "customerName",
      label: "Customer",
      sortable: true,
      searchable: true,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      options: [
        { value: "pending", label: "Pending", color: "#f59e0b" },
        { value: "processing", label: "Processing", color: "#3b82f6" },
        { value: "shipped", label: "Shipped", color: "#8b5cf6" },
        { value: "delivered", label: "Delivered", color: "#10b981" },
        { value: "cancelled", label: "Cancelled", color: "#ef4444" },
      ],
    },
    {
      key: "total",
      label: "Total",
      type: "currency",
      sortable: true,
      align: "right",
    },
    {
      key: "orderDate",
      label: "Order Date",
      type: "date",
      sortable: true,
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      sortable: true,
      options: [
        { value: "low", label: "Low", color: "#10b981" },
        { value: "medium", label: "Medium", color: "#f59e0b" },
        { value: "high", label: "High", color: "#ef4444" },
      ],
    },
  ];

  // Project Table Configuration
  const projectColumns: ColumnConfig[] = [
    {
      key: "name",
      label: "Project",
      sortable: true,
      searchable: true,
      width: "200px",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      sortable: true,
      options: [
        { value: "planning", label: "Planning", color: "#6b7280" },
        { value: "in-progress", label: "In Progress", color: "#3b82f6" },
        { value: "review", label: "Review", color: "#f59e0b" },
        { value: "completed", label: "Completed", color: "#10b981" },
        { value: "cancelled", label: "Cancelled", color: "#ef4444" },
      ],
    },
    {
      key: "progress",
      label: "Progress",
      sortable: true,
      align: "center",
      render: (value) => {
        const numValue = Number(value) || 0;
        return (
          <div className="flex items-center gap-2">
            <div className="w-16 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${numValue}%` }}
              />
            </div>
            <span className="text-sm">{numValue}%</span>
          </div>
        );
      },
    },
    {
      key: "budget",
      label: "Budget",
      type: "currency",
      sortable: true,
      align: "right",
    },
    {
      key: "spent",
      label: "Spent",
      type: "currency",
      sortable: true,
      align: "right",
    },
    {
      key: "client",
      label: "Client",
      sortable: true,
      searchable: true,
    },
    {
      key: "endDate",
      label: "Due Date",
      type: "date",
      sortable: true,
    },
  ];

  // Common Actions
  const commonActions: ActionConfig[] = [
    {
      key: "view",
      label: "View",
      icon: <Eye className="w-4 h-4" />,
      variant: "ghost",
      onClick: (item) => console.log("View:", item),
    },
    {
      key: "edit",
      label: "Edit",
      icon: <Edit className="w-4 h-4" />,
      variant: "ghost",
      onClick: (item) => console.log("Edit:", item),
    },
  ];

  // Specialized Actions
  const employeeActions: ActionConfig[] = [
    ...commonActions,
    {
      key: "message",
      label: "Message",
      icon: <MessageSquare className="w-4 h-4" />,
      variant: "ghost",
      onClick: (item) => console.log("Message:", item),
    },
  ];

  const productActions: ActionConfig[] = [
    ...commonActions,
    {
      key: "duplicate",
      label: "Duplicate",
      icon: <Package className="w-4 h-4" />,
      variant: "ghost",
      onClick: (item) => console.log("Duplicate:", item),
    },
  ];

  const orderActions: ActionConfig[] = [
    ...commonActions,
    {
      key: "track",
      label: "Track",
      icon: <MapPin className="w-4 h-4" />,
      variant: "ghost",
      onClick: (item) => console.log("Track:", item),
    },
  ];

  // Table Configurations
  const employeeTableConfig: TableConfig = {
    title: "Employee Management",
    description: "Manage your team members and their information",
    enableSelection: true,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    itemsPerPage: 5,
    striped: true,
  };

  const productTableConfig: TableConfig = {
    title: "Product Catalog",
    description: "Manage your product inventory and details",
    enableSelection: true,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    itemsPerPage: 5,
    compact: true,
  };

  const customerTableConfig: TableConfig = {
    title: "Customer Database",
    description: "View and manage customer information",
    enableSelection: true,
    enableSearch: true,
    enableFilters: false,
    enablePagination: true,
    itemsPerPage: 5,
    bordered: true,
  };

  const orderTableConfig: TableConfig = {
    title: "Order Management",
    description: "Track and manage customer orders",
    enableSelection: true,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    itemsPerPage: 5,
    stickyHeader: true,
  };

  const projectTableConfig: TableConfig = {
    title: "Project Portfolio",
    description: "Monitor project progress and budgets",
    enableSelection: false,
    enableSearch: true,
    enableFilters: true,
    enablePagination: true,
    itemsPerPage: 5,
    striped: true,
  };

  // State management for each table
  const [employeeTableData, setEmployeeTableData] = useState(employeeData);
  const [productTableData, setProductTableData] = useState(productData);
  const [customerTableData, setCustomerTableData] = useState(customerData);
  const [orderTableData, setOrderTableData] = useState(orderData);
  const [projectTableData, setProjectTableData] = useState(projectData);

  // Common handlers
  const handleExport = (data: GenericDataItem[], filename: string) => {
    console.log(`Exporting ${filename}:`, data);
    // Implement CSV export logic here
  };

  const handleRefresh = (
    setData: React.Dispatch<React.SetStateAction<GenericDataItem[]>>,
    originalData: GenericDataItem[]
  ) => {
    console.log("Refreshing data...");
    setTimeout(() => {
      setData([...originalData]);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Dynamic Table Examples</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive examples showcasing all possible configurations and use
          cases of the dynamic table component across different business
          scenarios.
        </p>
      </div>

      <Tabs defaultValue="employee" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="employee" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="product" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="customer" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="order" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="project" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Projects
          </TabsTrigger>
        </TabsList>

        {/* Employee Management */}
        <TabsContent value="employee" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Employee Management System
              </CardTitle>
              <CardDescription>
                Complete HR management with employee profiles, performance
                tracking, and role management. Features: Avatar display,
                multi-select actions, advanced filtering, and comprehensive edit
                forms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicTable
                data={employeeTableData}
                columns={employeeColumns}
                formFields={employeeFormFields}
                actions={employeeActions}
                tableConfig={employeeTableConfig}
                editModalConfig={{
                  title: "Edit Employee",
                  description: "Update employee information",
                  width: "xl",
                  sections: [
                    { key: "personal", title: "Personal Information" },
                    { key: "work", title: "Work Details" },
                  ],
                }}
                onDataChange={setEmployeeTableData}
                onExport={(data) => handleExport(data, "employees")}
                onRefresh={() =>
                  handleRefresh(setEmployeeTableData, employeeData)
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Management */}
        <TabsContent value="product" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Catalog Management
              </CardTitle>
              <CardDescription>
                E-commerce product management with inventory tracking, pricing,
                and category organization. Features: Stock level indicators,
                rating displays, and category-based filtering.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicTable
                data={productTableData}
                columns={productColumns}
                actions={productActions}
                tableConfig={productTableConfig}
                filters={[
                  {
                    key: "category",
                    label: "Category",
                    type: "select",
                    options: [
                      { value: "electronics", label: "Electronics" },
                      { value: "wearables", label: "Wearables" },
                      { value: "computers", label: "Computers" },
                    ],
                  },
                  {
                    key: "status",
                    label: "Status",
                    type: "select",
                    options: [
                      { value: "active", label: "Active" },
                      { value: "low-stock", label: "Low Stock" },
                      { value: "out-of-stock", label: "Out of Stock" },
                    ],
                  },
                ]}
                onDataChange={setProductTableData}
                onExport={(data) => handleExport(data, "products")}
                onRefresh={() =>
                  handleRefresh(setProductTableData, productData)
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Management */}
        <TabsContent value="customer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Customer Relationship Management
              </CardTitle>
              <CardDescription>
                Customer database with purchase history, segmentation, and
                contact management. Features: Customer avatars, spending
                analytics, and status-based organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicTable
                data={customerTableData}
                columns={customerColumns}
                actions={[
                  ...commonActions,
                  {
                    key: "email",
                    label: "Email",
                    icon: <Mail className="w-4 h-4" />,
                    variant: "ghost",
                    onClick: (item) => window.open(`mailto:${item.email}`),
                  },
                  {
                    key: "call",
                    label: "Call",
                    icon: <Phone className="w-4 h-4" />,
                    variant: "ghost",
                    onClick: (item) => window.open(`tel:${item.phone}`),
                  },
                ]}
                tableConfig={customerTableConfig}
                onDataChange={setCustomerTableData}
                onExport={(data) => handleExport(data, "customers")}
                onRefresh={() =>
                  handleRefresh(setCustomerTableData, customerData)
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Order Management */}
        <TabsContent value="order" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Order Management System
              </CardTitle>
              <CardDescription>
                Complete order processing with status tracking, payment
                management, and delivery coordination. Features: Priority
                indicators, status workflows, and tracking integration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicTable
                data={orderTableData}
                columns={orderColumns}
                actions={orderActions}
                tableConfig={orderTableConfig}
                filters={[
                  {
                    key: "status",
                    label: "Status",
                    type: "select",
                    options: [
                      { value: "pending", label: "Pending" },
                      { value: "processing", label: "Processing" },
                      { value: "shipped", label: "Shipped" },
                      { value: "delivered", label: "Delivered" },
                      { value: "cancelled", label: "Cancelled" },
                    ],
                  },
                  {
                    key: "priority",
                    label: "Priority",
                    type: "select",
                    options: [
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                    ],
                  },
                  {
                    key: "orderDate",
                    label: "Order Date",
                    type: "date",
                  },
                ]}
                onDataChange={setOrderTableData}
                onExport={(data) => handleExport(data, "orders")}
                onRefresh={() => handleRefresh(setOrderTableData, orderData)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Management */}
        <TabsContent value="project" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Portfolio Management
              </CardTitle>
              <CardDescription>
                Project tracking with budget monitoring, progress visualization,
                and timeline management. Features: Progress bars, budget
                tracking, and milestone indicators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DynamicTable
                data={projectTableData}
                columns={projectColumns}
                actions={[
                  ...commonActions,
                  {
                    key: "timeline",
                    label: "Timeline",
                    icon: <Calendar className="w-4 h-4" />,
                    variant: "ghost",
                    onClick: (item) => console.log("View timeline:", item),
                  },
                  {
                    key: "budget",
                    label: "Budget",
                    icon: <DollarSign className="w-4 h-4" />,
                    variant: "ghost",
                    onClick: (item) => console.log("View budget:", item),
                  },
                ]}
                tableConfig={projectTableConfig}
                filters={[
                  {
                    key: "status",
                    label: "Status",
                    type: "select",
                    options: [
                      { value: "planning", label: "Planning" },
                      { value: "in-progress", label: "In Progress" },
                      { value: "review", label: "Review" },
                      { value: "completed", label: "Completed" },
                      { value: "cancelled", label: "Cancelled" },
                    ],
                  },
                  {
                    key: "priority",
                    label: "Priority",
                    type: "select",
                    options: [
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                    ],
                  },
                ]}
                onDataChange={setProjectTableData}
                onExport={(data) => handleExport(data, "projects")}
                onRefresh={() =>
                  handleRefresh(setProjectTableData, projectData)
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feature Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Overview</CardTitle>
          <CardDescription>
            All the features demonstrated across the different table examples
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Core Features
              </h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Dynamic column configuration</li>
                <li>• Sortable columns</li>
                <li>• Search functionality</li>
                <li>• Advanced filtering</li>
                <li>• Pagination</li>
                <li>• Responsive design</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Data Management
              </h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Inline editing</li>
                <li>• Modal forms</li>
                <li>• Form validation</li>
                <li>• File uploads</li>
                <li>• Multi-select operations</li>
                <li>• Bulk actions</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Award className="w-4 h-4" />
                Advanced Features
              </h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Custom cell renderers</li>
                <li>• Avatar integration</li>
                <li>• Progress indicators</li>
                <li>• Status badges</li>
                <li>• Export functionality</li>
                <li>• Real-time updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
