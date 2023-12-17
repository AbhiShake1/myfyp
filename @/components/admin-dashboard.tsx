import { FypPage } from "./dynamic";

export function AdminDashboard() {
  return <FypPage>
    {{
      head: {
        title: "Welcome to Admin Dashboard",
      },
      body: {
        layout: "grid",
        sections: [
          {
            type: "card",
            header: {
              title: "Manage Students",
              description: "View, add, update, and delete students",
            },
            content: [
              {
                type: "button",
                text: "Go to Students",
                actions: [
                  {
                    navigate: {
                      type: "push",
                      to: "/admin/students",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "card",
            header: {
              title: "Manage Staff",
              description: "View, add, update, and delete staff members",
            },
            content: [
              {
                type: "button",
                text: "Go to Staff",
                actions: [
                  {
                    navigate: {
                      type: "push",
                      to: "/admin/staffs",
                    },
                  },
                ],
              },
            ],
          },
          {
            type: "card",
            header: {
              title: "Manage Staff",
              description: "View, add, update, and delete staff members",
            },
            content: [
              {
                type: "button",
                text: "Go to Staff",
                actions: [
                  {
                    navigate: {
                      type: "push",
                      to: "/admin/staffs",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    }}
  </FypPage>
}
