import { Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { countLike, createLike, deleteLike, getLike } from "../../lib/api/like";
import { GetLike } from "../../types/api/like";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

type Props = {
  userId: number;
  postId: number;
};

const LikeButton: FC<Props> = memo((props) => {
  const { postId, userId } = props;
  const [good, setGood] = useState<GetLike | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGood = async () => {
      try {
        const params = { post_id: postId, user_id: userId };
        const res = await getLike(params);
        setGood(res.data);
        const count = await countLike(postId);
        setLikeCount(count.data);
        setLoading(false);
      } catch (e: any) {
        console.log(e);
      }
    };
    getGood();
  }, []);

  const handleCreateLike = useCallback(async () => {
    try {
      const params = { post_id: postId, user_id: userId };
      const res = await createLike(params);
      setGood(res.data);
      console.log(res.data);
      const count = await countLike(postId);
      setLikeCount(count.data);
    } catch (e: any) {
      console.log(e);
    }
  }, []);

  const handleDeleteLike = async (id: number) => {
    try {
      const res = await deleteLike(id);
      setGood(null);
      console.log(res.data);
      console.log(res.data);
      const count = await countLike(postId);
      setLikeCount(count.data);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <>
      {!loading && (
        <>
          {good ? (
            <Flex>
              <FontAwesomeIcon
                icon={fasHeart}
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => handleDeleteLike(good.id)}
              />
              <>{likeCount}</>
            </Flex>
          ) : (
            <Flex>
              <FontAwesomeIcon
                icon={farHeart}
                style={{ cursor: "pointer" }}
                onClick={handleCreateLike}
              />
              <>{likeCount}</>
            </Flex>
          )}
        </>
      )}
    </>
  );
});

export default LikeButton;
