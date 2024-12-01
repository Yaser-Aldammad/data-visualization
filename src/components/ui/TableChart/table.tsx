import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}



/*
  const [detailedData, setDetailedData] = useState<Message[]>([]);
    setDetailedData(processData.messages || []);



      <h2 className="mt-8 text-lg font-semibold">Detailed Information</h2>
      <Table className="mt-4 w-full border border-gray-300">
        <TableHeader>
          <TableRow>
            <TableHead className="border px-4 py-2">ID</TableHead>
            <TableHead className="border px-4 py-2">Message</TableHead>
            <TableHead className="border px-4 py-2">Description</TableHead>
            <TableHead className="border px-4 py-2">Meaning</TableHead>
            <TableHead className="border px-4 py-2">Categories</TableHead>
            <TableHead className="border px-4 py-2">Spatial Context</TableHead>
            <TableHead className="border px-4 py-2">Temporal Context</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {detailedData.length > 0 ? (
            detailedData.map((item) => (
              <TableRow key={item.id} className="border">
                <TableCell className="border px-4 py-2">{item.id}</TableCell>
                <TableCell className="border px-4 py-2">{item.message}</TableCell>
                <TableCell className="border px-4 py-2">{item.description}</TableCell>
                <TableCell className="border px-4 py-2">{item.meaning || "N/A"}</TableCell>
                <TableCell className="border px-4 py-2">{item.categories.join(", ")}</TableCell>
                <TableCell className="border px-4 py-2">{item.spatialContext}</TableCell>
                <TableCell className="border px-4 py-2">{item.temporalContext}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="border px-4 py-2 text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table> */