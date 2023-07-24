import { useEffect, useState } from "react";

export default function useTitle(defaultValue: string): {
    title: string;
    changeTitle: (value: string) => void
} {
    const [title, setTitle] = useState(defaultValue);

    useEffect(() => {
        document.title = title;
    }, [title])

    return { title, changeTitle: (value: string) => setTitle(value) };
}