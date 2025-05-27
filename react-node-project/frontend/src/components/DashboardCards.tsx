
import { ContainerInfo } from "./CSS-components"
import InfoCard from "./InfoCard"


const DashboardCards = () => {

  return (
    <>
    <div style={ContainerInfo}>
      <InfoCard title="אבידות" count={3} color="red" />
      <InfoCard title="מציאות" count={3} color="gray" />
      <InfoCard title="פריטים שהושבו" count={0} color="green" />
    </div>
    </>
  )
}

export default DashboardCards