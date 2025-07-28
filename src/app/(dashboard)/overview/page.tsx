// src/app/(dashboard)/overview/page.tsx
import StatsCard from "@/components/common/StatsCard";
import DashboardHeader from "../components/dashboard-header";
import { AnalyticsSection } from "../components/Overview/AnalyticsSection";
// import { IncomeExpenseSection } from "../components/Overview/IncomeExpenseSection";
// import TransactionsSection from "../components/Overview/TransectionsSection";
import IconShowcase from "@/components/usages-example/icon-showcase";
import LordiconExample from "@/components/usages-example/lordicon-example";
import TableExamplesPage from "@/components/usages-example/TableExamplesPage";

export default function OverviewPage() {
  return (
    <div className="">
      <DashboardHeader title="Welcome  Nayon" />
      <div className="p-2 md:p-4 space-y-4 md:space-y-10">
        <StatsCard />
        <TableExamplesPage/>
        <IconShowcase />
        <LordiconExample />
        {/* <IncomeExpenseSection /> */}
        <AnalyticsSection />
        {/* <TransactionsSection /> */}
      </div>
    </div>
  );
}
