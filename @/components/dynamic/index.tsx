import { type FypPageBodyProps, FypPageBody } from "./body";

export type FypPageProps = {
  head?: {
    title: string,
    description?: string,
  },
  body: FypPageBodyProps,
};

export function FypPage({ children: { head, body } }: { children: FypPageProps }) {
  const { layout = "col", expand = false } = body;
  return (
    <div className={!expand && layout === "col" ? 'mx-auto max-w-lg space-y-6' : "w-full"}>
      {
        head &&
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            {head.title}
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {head.description}
          </p>
        </div>
      }
      <FypPageBody {...body} />
    </div>
  )
}

