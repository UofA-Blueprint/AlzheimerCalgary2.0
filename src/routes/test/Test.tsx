import TestSquare from "@/components/TestSquare";

function Test() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-display1">Display 1</div>
      <div className="text-display2">Display 2</div>
      <div className="text-h1">H1 Heading</div>
      <div className="text-h2">H2 Heading</div>
      <div className="text-h3">H3 Heading</div>
      <div className="text-h4">H4 Heading</div>
      <div className="text-body-reg">Body Regular</div>
      <div className="text-body-sm">Body Small</div>
      <div className="text-sm">Small</div>
      <div className="text-tiny">Tiny</div>
      <div className="grid grid-rows-auto grid-cols-3 gap-2">
        <TestSquare className={"bg-primary-main"} />
        <TestSquare className={"bg-secondary-main"} />
        <TestSquare className={"bg-accent"} />
        <TestSquare className={"bg-profile-jade"} />
        <TestSquare className={"bg-profile-tulip"} />
      </div>
    </div>
  );
}

export default Test;
