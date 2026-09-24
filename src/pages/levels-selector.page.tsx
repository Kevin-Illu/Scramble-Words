import { gameLevels } from "@/game/game-logic";
import { MenuContainer, type OptionItem } from "@/ui/ui.component";
import { BookType, Home } from "lucide-react";
import { useLocation } from "wouter";


export function LevelsSelectorPage() {
  const [, navigate] = useLocation();

  const options: OptionItem[] = gameLevels.map((lvl) => ({
    id: lvl.level,
    label: `LEVEL ${lvl.level}`,
    icon: <BookType size={26} />,
    onClick: () => navigate(`level/${lvl.level}`)
  }))

  options.push({
    id: 9000,
    label: "GO BACK",
    variant: "secondary",
    icon: <Home size={26} />,
    onClick: () => navigate('/')
  })


  return (
    <div className="levels w-screen h-screen text-xl text-white">
      <div className="w-full h-full flex justify-center items-center">
        <MenuContainer
          title="SELECT A LEVEL TO START"
          titleSize="sm"
          options={options}
          quote="The limits of my language mean the limits of my world. — Ludwig Wittgenstein"
        >
        </MenuContainer>
      </div>
    </div>
  )
}
