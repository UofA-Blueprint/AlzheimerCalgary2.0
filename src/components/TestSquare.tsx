export interface TestSquareProps {
  className: string;
}

function TestSquare({ className }: TestSquareProps) {
  return <div className={"w-[40px] h-[40px] " + className}></div>;
}

export default TestSquare;
