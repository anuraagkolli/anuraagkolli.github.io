import BitterLesson from "@/components/bitter-lesson"

export default function Bio() {
  return (
    <div className="figure-group">
      <p style={{ lineHeight: 1.6 }}>
        I&apos;m a 2026 Kleiner Perkins Fellow studying artificial intelligence and computer science
        at Purdue.
      </p>

      <figure className="my-6 flex justify-center">
        <BitterLesson />
      </figure>

      <p style={{ lineHeight: 1.6 }}>
        The chart above is{" "}
        <a
          className="prose-link"
          href="http://www.incompleteideas.net/IncIdeas/BitterLesson.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rich Sutton&apos;s bitter lesson
        </a>
        , the most expensive thing the field keeps relearning. Every hard problem offers the same
        two roads:{" "}
        <span className="hint" data-cr="old" tabIndex={0}>
          teach the machine what we already know
        </span>
        , or{" "}
        <span className="hint" data-cr="new" tabIndex={0}>
          build something that can search and learn
        </span>
        . The first wins the year and loses the decade. I&apos;m interested in the second, and in
        the unglamorous plumbing that decides whether a model stays a demo or becomes a product.{" "}
        <em>What does it take to make the second road actually work?</em>
      </p>
    </div>
  )
}
