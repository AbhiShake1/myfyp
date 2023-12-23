import { FypPage } from "@/components/dynamic";
import { Center } from "@/components/ui/center";

export default function Page() {
  return <Center>
    <FypPage>{{
      head: {
        title: "User Registration",
        description: "Please enter your details to create an account",
      },
      body: {
        sections: [
          {
            type: "card",
            header: {
              title: "Step 1: Personal Information",
            },
            inputs: [
              {
                title: "First Name",
                placeholder: "John",
                required: true,
              },
              {
                title: "Last Name",
                placeholder: "Doe",
                required: true,
              },
            ],
          },
          {
            type: "card",
            header: {
              title: "Step 2: College Selection",
            },
            inputs: [
              {
                title: "College",
                placeholder: "Harvard University",
              }
            ],
          },
          {
            type: "card",
            header: {
              title: "Step 3: Batch and Course Selection",
            },
            inputs: [
              {
                title: "Batch",
                placeholder: "2022",
                required: true,
              },
              {
                title: "Course",
                placeholder: "Computer Science",
                required: true,
              },
            ],
          },
          {
            type: "button",
            text: "Register",
            buttonType: "submit",
            actions: [
              {
                navigate: {
                  to: "/subscription/",
                  type: "replace",
                },
              },
            ],
          },
        ],
      },
    }}</FypPage>
  </Center>
}
