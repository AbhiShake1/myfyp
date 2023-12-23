/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/GLJKQo50gQ0
 */
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (txt) => txt.toUpperCase());
}

export function UserTable<T extends Record<string, string | number>>({ props }: { props: T[] }) {
  if (props.length === 0) return null;

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="border shadow-sm rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(props[0]!).map((title) => {
                  return <TableHead key={title} className="font-bold">
                    {toTitleCase(title)}
                  </TableHead>
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {props.map((prop) => {
                return <TableRow>
                  {Object.values(prop).map(value => {
                    return <TableCell>
                      {value}
                    </TableCell>
                  })}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontalIcon className="w-4 h-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}


function MoreHorizontalIcon(props: {className: string}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
