import { MenuContainer } from "@/ui/ui.component";
import { University } from "lucide-react";
import { useLocation } from "wouter";

export function HomePage() {
  const [, navigate] = useLocation();
  return (
    <div className="home w-screen h-screen text-white">
      <div className="w-full h-full gap-8 flex flex-col justify-center items-center">
        <div>
          <MenuContainer
            title={"SCRAMBLE WORDS"}
            titleSize="lg"
            options={[
              {
                id: "levels",
                label: "LEVELS",
                icon: <University size={26} />,
                onClick: () => navigate("levels")
              }
            ]}
            quote="The hardest years in life are those between ten and seventy. — Helen Hayes">
          </MenuContainer>
        </div>
        <p className="text-gray-200">Bully's english class mini game recreation made by Kevin Illu</p>
      </div>
    </div>
  )
}
