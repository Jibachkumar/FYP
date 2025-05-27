import React from "react";
import { Link } from "react-router-dom";

function Sales() {
  return (
    <div>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="flex items-center text-[22px] font-extrabold text-[#0B1A72] leading-none">
            <i className="fas fa-users mr-2"></i> Customers
          </h1>
        </div>

        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <form
            className="flex items-center w-full sm:w-auto"
            role="search"
            aria-label="Search customers"
          >
            <label htmlFor="search-customers" className="sr-only">
              Search customers
            </label>
            <input
              id="search-customers"
              type="search"
              placeholder="Search customers"
              className="border border-[#2B2B9B] rounded-l-md px-3 py-2 w-full sm:w-[320px] text-[14px] text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B] focus:border-[#2B2B9B]"
            />
            <button
              type="button"
              aria-label="Filter options"
              className="bg-[#E5E7EB] border border-l-0 border-[#E5E7EB] rounded-r-md px-3 py-2 text-[#2B2B9B] hover:bg-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-bars"></i>
            </button>
            <button
              type="reset"
              aria-label="Clear search"
              className="ml-2 text-[#6B7280] hover:text-[#2B2B9B] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-times"></i>
            </button>
          </form>

          <div className="flex space-x-3 justify-end w-full sm:w-auto">
            <button
              type="button"
              className="bg-[#001AFF] text-white rounded-md px-4 py-2 text-[14px] font-semibold hover:bg-[#000ECC] focus:outline-none focus:ring-2 focus:ring-[#000ECC]"
            >
              + Customer
            </button>
          </div>
        </section>

        <section className="border border-[#E5E7EB] rounded-lg p-4">
          <div className="flex space-x-4 mb-3">
            <button
              type="button"
              className="flex items-center space-x-2 rounded-md border border-[#D1D5DB] bg-white px-3 py-1 text-[14px] font-semibold text-[#2B2B9B] hover:bg-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
              aria-pressed="true"
            >
              <i className="fas fa-list-ul"></i>
              <span>List view</span>
            </button>
          </div>

          <table className="w-full text-[13px] text-[#6B7280] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="pl-2 pr-3 py-2 text-left align-top w-[40px]">
                  <input
                    type="checkbox"
                    aria-label="Select all customers"
                    className="cursor-pointer"
                  />
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span>Name / VAT</span>
                    <i className="fas fa-sort text-[#9CA3AF]"></i>
                  </div>
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span>Phone / email</span>
                    <i className="fas fa-sort text-[#9CA3AF]"></i>
                  </div>
                </th>
                <th className="pl-2 pr-3 py-2 text-left align-top font-semibold text-[#6B7280] select-none cursor-pointer">
                  <div className="flex items-center space-x-1">
                    <span>Address</span>
                    <i className="fas fa-sort text-[#9CA3AF]"></i>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-[14px] text-[#111827]">
              <tr className="border-b border-[#E5E7EB]">
                <td className="pl-2 pr-3 py-3 align-top">
                  <input
                    type="checkbox"
                    aria-label="Select Lance Armstrong"
                    className="cursor-pointer"
                  />
                </td>
                <td className="pl-2 pr-3 py-3 align-top font-semibold">
                  Jibachh Kumar
                </td>
                <td className="pl-2 pr-3 py-3 align-top leading-tight">
                  <div>9810266710</div>
                  <div>info@jibachh.net</div>
                </td>
                <td className="pl-2 pr-3 py-3  align-top leading-tight">
                  <div>Kathmandu, Bagmati</div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-center mt-6 space-x-3">
            <button
              type="button"
              aria-label="Previous page"
              className="rounded-md bg-[#E5E7EB] px-4 py-2 text-[#6B7280] hover:bg-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              type="button"
              aria-label="Next page"
              className="rounded-md bg-[#E5E7EB] px-4 py-2 text-[#6B7280] hover:bg-[#D1D5DB] focus:outline-none focus:ring-2 focus:ring-[#2B2B9B]"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
          <div className="flex justify-center mt-1 text-[11px] text-[#6B7280]">
            <i className="fas fa-stopwatch mr-1"></i> Show count
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sales;
