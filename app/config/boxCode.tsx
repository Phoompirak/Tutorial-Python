
interface BoxPythonProps {
    section: string;
    explaind: string;
    initialCode: string;
    initialOutput: string;
    language?: string;
}


export const boxCode: BoxPythonProps[] = [
  {
    section: "Hello World",
    explaind: "Show Text Output Hello World",
    initialCode:
      'print("Hello, Python!")\n\nN=6\n\nfor a in range(1, N+1):\n    for b in range(N):\n        print("*", end=" ")\n    print()',
    initialOutput: "Hello, Python!\n\n*\n**\n***\n****\n*****\n******\n\n",
    language: "python",
  },
  {
    section: "Pattern Printing",
    explaind: "Draw a right triangle using loops",
    initialCode: 'N=5\nfor i in range(1, N+1):\n    print("*" * i)',
    initialOutput: "*\n**\n***\n****\n*****",
    language: "python",
  },
  {
    section: "Sum of Numbers",
    explaind: "Calculate sum from 1 to 10",
    initialCode: "total = sum(range(1, 11))\nprint('Sum:', total)",
    initialOutput: "Sum: 55",
    language: "python",
  },
];
