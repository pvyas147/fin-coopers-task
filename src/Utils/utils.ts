import toast from "react-hot-toast";
// import { addRecommendedProduct } from "../Services/userServices/categorySerives";

export const errMsg = (response: any) => {
    if (typeof (response.data) === "object") {
        for (let [key] of Object.entries(response?.data)) {
            return `${response?.data[key] || 'Something went wrong!'}`
        }
    }
    return 'Something went wrong!'
}

export const formatPrice = (price: any) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 0, // agar decimal points nahi chahiye
    }).format(price);
};


export const handleAddRecommended = async (id:any) => {
    try {
        // await addRecommendedProduct(id)
    } catch (error) {
        console.error("error", error)
    }
}

