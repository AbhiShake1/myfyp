import { FypPage } from "@/components/dynamic";
import { Center } from "@/components/ui/center";

export default function Page() {
  return <Center>
    <FypPage>
      {{
        head: {
          title: "Choose Your Subscription",
          description: "Select a plan that best fits your needs. We offer flexible subscription options for every type of user.",
        },
        body: {
          expand: true,
          sections: [
            {
              layout: "row",
              sections: [
                {
                  type: "card",
                  header: {
                    title: "Weekly Plan",
                  },
                  content: [
                    "Unlimited access for a week",
                    {
                      type: "button",
                      text: "Select Plan",
                      expand: false,
                      buttonType: "submit",
                      actions: [],
                      variant: "outline",
                    },
                  ],
                },
                {
                  type: "card",
                  header: {
                    title: "Monthly Plan",
                  },
                  content: [
                    "Unlimited access for a month",
                    {
                      type: "button",
                      text: "Select Plan",
                      expand: false,
                      buttonType: "submit",
                      actions: [],
                      variant: "outline",
                    },
                  ],
                },
                {
                  type: "card",
                  header: {
                    title: "Annual Plan",
                  },
                  content: [
                    "Unlimited access for a year",
                    {
                      type: "button",
                      text: "Select Plan",
                      expand: false,
                      buttonType: "submit",
                      actions: [],
                      variant: "outline",
                    },
                  ],
                },
              ],
            },
            {
							layout: "row",
              sections: [
                {
                  type: "form",
                  title: "Or, pick the way you like it",
                  inputs: [
                    {
                      title: "Custom Subscription",
                      placeholder: "Enter number of days, months, or years",
                      required: true,
                    },
                  ],
                  button: {
                    text: "Create Plan",
                    buttonType: "submit",
                    expand: false,
                    actions: [
                      {
                        navigate: {
                          to: "/admin",
                          type: "replace",
                        },
                      },
                    ],
                  },
                  footer: {
                    text: "Create a custom plan based on your needs",
                    link: {
                      text: "Terms & Conditions",
                      href: "#",
                    },
                  },
                }
              ],
            }
          ],
        },
      }}
    </FypPage>
  </Center>
}
