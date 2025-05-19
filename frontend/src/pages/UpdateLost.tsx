import {
    Link,
    useNavigate,
    useParams
} from "react-router";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
    useGetLostByIdQuery,
    useUpdateLostMutation
} from "../redux/api/losts/apiLostSlice";
import { skipToken } from "@reduxjs/toolkit/query";

import AddLostSchema from "../schemas/AddLostSchema";
import {
    errorCSS,
    loginForm,
    margin,
    topbtn
} from "../globalStyle";
import { inputStyle } from "./CSS-pages";
import {
    Category,
    Cities,
    FieldFillByUser_Lost,
    Lost,
    User
} from "../interfaces/models";
import { mainContentStyle } from "../components/CSS-components";

/* ---------- פונקציות עזר ---------- */
const parseDate = (str: string): Date | undefined => {
    if (!str) return undefined;
    // YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
        const [year, month, day] = str.split('-').map(Number);
        return new Date(year, month - 1, day); // חודשים ב-JS הם מ-0 עד 11
    }
    // ISO מלא (ייתכן שתצטרך את זה אם השרת שולח כך)
    const isoDate = new Date(str);
    if (!isNaN(isoDate.getTime())) {
        return isoDate;
    }
    return undefined;
};
/* ----------------------------------- */
const UpdateLost = () => {
    const { id } = useParams();
    const { data: thisLost } = useGetLostByIdQuery(id ?? skipToken);
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch
    } = useForm<FieldFillByUser_Lost>({
        resolver: zodResolver(AddLostSchema)
    });
    const dateValue = watch("date");
    useEffect(() => {
        console.log("Watched date value:", dateValue);
    }, [dateValue]);

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [updateLost] = useUpdateLostMutation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User>();
    /* --- משיכת משתמש מה‑localStorage --- */
    useEffect(() => {

        const stored = localStorage.getItem("currentUser");
        if (stored) setCurrentUser(JSON.parse(stored));
    }, []);
    /* --- Submit --- */
    const onSubmit = async (data: FieldFillByUser_Lost) => {
        console.log("data.date value:", data.date);
        let parsedDate: Date | undefined = new Date(data.date);
        if (isNaN(parsedDate.getTime())) {
            parsedDate = parseDate(data.date);
            if (!parsedDate) {
                console.error("Invalid date format:", data.date);
                return;
            }
        }
        const updatedLost: Lost = {
            name: data.name,
            date: parsedDate,
            city: data.city,
            street: data.street,
            category: Category[selectedCategory as keyof typeof Category],
            owner: currentUser as User
        };
        try {
            console.log("in try");
            await updateLost({ _id: id!, ...updatedLost }).unwrap();
            navigate("/");
        } catch (err) {
            console.error("Error updating lost:", err);
        }
    };
    /* --- JSX --- */
    return (
        <div>
            <div style={mainContentStyle}>
                <div style={{ justifyContent: "flex-end", width: "60vw" }}>
                    <Link to=" /">{` ← עמוד הבית `}</Link>

                    <form style={loginForm} onSubmit={handleSubmit(onSubmit)}>
                        {/* שם האבידה */}
                        <TextField
                            {...register("name")}
                            sx={inputStyle}
                            style={margin}
                            defaultValue={thisLost?.name}
                            variant="outlined"
                            name="name"
                        />
                        {errors.name && (
                            <div style={errorCSS}>{errors.name.message}</div>
                        )}

                        {/* תאריך */}
                        <TextField
                            type="date"
                            {...register("date")}
                            sx={inputStyle}
                            style={margin}
                            defaultValue={thisLost?.date ? (thisLost.date instanceof Date ? thisLost.date.toISOString().split('T')[0] : new Date(thisLost.date).toISOString().split('T')[0]) : ''}
                            variant="outlined"
                            name="date"
                        />
                        {errors.date && (
                            <div style={errorCSS}>{errors.date.message}</div>
                        )}

                        {/* עיר */}
                        <FormControl sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="city-select-label">עיר</InputLabel>
                            <Select
                                labelId="city-select-label"
                                defaultValue={thisLost?.city}
                                {...register("city", { required: "חובה לבחור עיר" })}
                            >
                                <MenuItem value="" disabled>
                                    בחר עיר
                                </MenuItem>
                                {Object.values(Cities).map((city) => (
                                    <MenuItem key={city} value={city}>
                                        {city}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.city && (
                            <div style={errorCSS}>{errors.city.message}</div>
                        )}

                        {/* רחוב */}
                        <TextField
                            {...register("street")}
                            sx={inputStyle}
                            style={margin}
                            defaultValue={thisLost?.street}
                            variant="outlined"
                        />
                        {errors.street && (
                            <div style={errorCSS}>{errors.street.message}</div>
                        )}

                        {/* קטגוריה */}
                        <FormControl sx={inputStyle} style={margin} fullWidth>
                            <InputLabel id="category-select-label">קטגוריה</InputLabel>
                            <Select
                                labelId="category-select-label"
                                onChange={(e: SelectChangeEvent) =>
                                    setSelectedCategory(e.target.value)
                                }
                                defaultValue={thisLost?.category}
                                label="קטגוריה"
                            >
                                {Object.values(Category)
                                    .filter((v) => isNaN(Number(v)))
                                    .map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            {cat}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>

                        {/* כפתור */}
                        <Button
                            type="submit"
                            fullWidth
                            style={topbtn}
                            variant="contained"
                            color="success"
                        >
                            עדכן אבידה
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateLost;