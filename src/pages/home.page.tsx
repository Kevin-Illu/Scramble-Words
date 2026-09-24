import { MenuContainer } from "@/ui/ui.component";
import { useLocation } from "wouter";

export function HomePage() {
  const [, navigate] = useLocation();
  return (
    <div className="home w-screen h-screen text-white">
      <div className="w-full h-full gap-8 flex flex-col justify-center items-center">
        <div className="">
          <MenuContainer
            title={"SCRAMBLE WORDS"}
            titleSize="lg"
            options={[
              { id: "levels", label: "LEVELS", onClick: () => navigate("levels") }
            ]}
            quote="Words possess power. Hopkins. Don't humiliate yourself in front of Miss Danvers.">
          </MenuContainer>
        </div>

        <p className="text-gray-200">A bully's game recreation made by Kevin Illu</p>
      </div>

    </div>
  )
}
