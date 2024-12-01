"use client";

import React from "react";
import DashboardLayout from "../../layout/dashboardLayout";
import DashboardNavbar from "../../components/dashboardNavbar/DashboardNavbar";
import { SearchProvider } from "../../components/searchContext/search-context";
import TraineeSidebarWrapper from "../../components/sidebar/TrainerSidebar";

const TrainerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="flex">
      <SearchProvider>
        <TraineeSidebarWrapper />
        <DashboardNavbar>{children}</DashboardNavbar>
        </SearchProvider>
      </div>
    </DashboardLayout>
  );
};

export default TrainerLayout;
