import { skills } from "@/lib/content"

export default function Skills() {
  return (
    <div className="-mx-3 mt-5 grid grid-cols-[auto_1fr] gap-x-6 sm:grid-cols-[150px_1fr]">
      {skills.map((skill) => (
        <div
          key={skill.label}
          className="ui row col-span-2 grid grid-cols-subgrid items-baseline"
          style={{ lineHeight: "26px" }}
        >
          <span className="font-medium">{skill.label}</span>
          <span className="text-gray-500">{skill.value}</span>
        </div>
      ))}
    </div>
  )
}
