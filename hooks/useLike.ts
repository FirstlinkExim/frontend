import React, { useCallback, useState } from "react";

const useLike = ({ productId, like = false }: { productId: string; like?: boolean }) => {
  const [isLike, setIsLike] = useState(like);


  const handleLike = useCallback(() => {
    setIsLike(!isLike)
  }, [isLike])

  return { isLike, handleLike }
}

export default useLike;