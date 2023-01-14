import './CommentList.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllComments } from '../../store/commentsReducer'
import CommentCard from '../CommentCard/CommentCard'

const CommentList = ({ songId }) => {
    const dispatch = useDispatch()
    const commentsObj = useSelector(state => state.commentsReducer)
    const commentsArr = Object.values(commentsObj)

    useEffect(() => {
        dispatch(loadAllComments(songId))
    }, [dispatch, songId])

    return (
        <div>
            {commentsArr.map((comment) => {
                return (
                    <CommentCard key={comment.id} comment={comment} songId={songId}></CommentCard>
                )
            })}
        </div>
    )
}

export default CommentList
