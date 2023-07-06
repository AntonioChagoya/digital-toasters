import TopBar from "./TopBar"
import Menu from "./Menu"
import Actions from "./Actions"
const HeaderIndex = () => {

  return (
    <header className="flex flex-col divide-y-[1px]">
      <TopBar />
      <Actions />
      <Menu />
    </header>
  )
}

export default HeaderIndex