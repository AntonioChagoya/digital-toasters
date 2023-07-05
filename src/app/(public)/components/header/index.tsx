import TopBar from "./TopBar"
import Menu from "./Menu"

const HeaderIndex = () => {

  return (
    <header className="flex flex-col divide-y-[1px]">
      <TopBar />
      <Menu />
    </header>
  )
}

export default HeaderIndex