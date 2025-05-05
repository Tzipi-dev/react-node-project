import { Button } from "@mui/material"
import { brownContainerStyle, buttonsContainerStyle, reportFoundButtonStyle, reportLostButtonStyle } from "../pages/CSS-pages"
import { Link } from "react-router"

const Add = () => {
    return (
        <>
            <div style={brownContainerStyle}>
                <h2>?אבדת משהו? מצאת משהו</h2>
                <p>.צרו קשר עם הקהילה כדי לעזור להחזיר חפצים אבודים לבעליהם החוקיים</p>
                <div style={buttonsContainerStyle}>
                    <Link to="/addLost">
                        <Button style={reportLostButtonStyle} >
                          הוספת אבידה
                        </Button>
                    </Link>
                    <Link to="/addFound">
                        <Button style={reportFoundButtonStyle}>
                         הוספת מציאה
                        </Button>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Add