import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <div className="flex justify-center bg-white p-4 font-serif">
      <div className="max-w-3xl w-full border border-gray-300">
        <h1 className="text-center font-semibold text-blue-700 text-lg pt-4 pb-6">
          Tour Booked Invoice
        </h1>

        <div className="grid grid-cols-2 border border-gray-300 text-xs text-gray-600">
          <div className="border-r border-gray-300 bg-gray-100 font-semibold text-center py-1">
            Invoice Details
          </div>
          <div className="bg-gray-100 font-semibold text-center py-1">
            Client Details
          </div>

          <div className="border-r border-gray-300 px-3 py-1">
            <span className="font-semibold">Invoice Date:</span> January 10,
            2051
          </div>
          <div className="px-3 py-1">
            <span className="font-semibold">Client Name:</span> Trace Durgan
          </div>

          <div className="border-r border-gray-300 px-3 py-1">
            <span className="font-semibold">Invoice Number:</span> INV-2051-001
          </div>
          <div className="px-3 py-1">
            <span className="font-semibold">Client Address:</span> Atlanta, GA
            30301
          </div>

          <div className="border-r border-gray-300 px-3 py-1">
            <span className="font-semibold">Due Date:</span> February 9, 2051
          </div>
          <div className="px-3 py-1">
            <span className="font-semibold">Client Contact:</span> 222 555 7777
          </div>
        </div>

        <table className="w-full border border-gray-300 mt-6 text-xs text-gray-700">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-center text-gray-600">
              <th className="py-1 px-3 text-left">Description of Services</th>
              <th className="py-1 px-3 w-32">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-1 px-3">5-Day Guided City Tour</td>
              <td className="py-1 px-3 text-right">$1,200.00</td>
            </tr>
            {/* <tr className="border-b border-gray-300">
              <td className="py-1 px-3">All-Inclusive Hotel Stay (4 nights)</td>
              <td className="py-1 px-3 text-right">$800.00</td>
            </tr> */}
          </tbody>
        </table>

        <table className="w-full border border-gray-300 mt-6 text-xs text-gray-700">
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="py-1 px-3 font-semibold text-right">Tax (10%)</td>
              <td className="py-1 px-3 text-right">$210.00</td>
            </tr>
            <tr>
              <td className="py-1 px-3 font-semibold text-right">
                Total Amount Due
              </td>
              <td className="py-1 px-3 text-right font-semibold">$2,310.00</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 text-xs text-gray-700 px-3 pb-6">
          <p className="font-semibold">Payment Information</p>
          <p className="mb-4">
            Please make payments to{" "}
            <span className="font-semibold">ViGlobe Bank</span>, Account Number:
            123456789
          </p>

          <p className="font-semibold">Terms and Conditions</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Cancellations made less than 7 days before the scheduled start
              date are non-refundable.
            </li>
            <li>
              Prices include all listed services but do not cover personal
              expenses or add-ons.
            </li>
          </ul>

          {/* <p>
            For further assistance, please contact{" "}
            <span className="font-semibold">[YOUR NAME]</span> at{" "}
            <span className="font-semibold">[YOUR EMAIL]</span>.
          </p> */}
        </div>
      </div>
    </div>
  </div>
));
ComponentToPrint.displayName = "ComponentToPrint";

export default function Report() {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={handlePrint}
          className="bg-blue-500 font-serif text-white font-bold py-2 px-2 rounded hover:bg-blue-900 hover:text-white transition-all duration-150 hover:ring-1 hover:ring-blue-400"
        >
          Print / Download
        </button>
      </div>
      <div>
        <ComponentToPrint ref={componentRef} />
      </div>
    </div>
  );
}
