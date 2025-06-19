import useSWR from "swr";
import {fetchChats} from "../../services/chats";
import {useDispatch} from "react-redux";
import {setChats} from "../../redux/chatSlice";

export const useFetchChats = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading, mutate: refetch} = useSWR(
        '/fetchChats',
        fetchChats,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            onSuccess: (data) => {
                dispatch(setChats(data || []))
            }
        }
    )
    return { data, error, isLoading, refetch }
}