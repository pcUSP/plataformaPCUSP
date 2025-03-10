import Image from "next/image"
import { styles } from "../../../app/styles/styles"
import { FC, useEffect, useState } from "react"
import { AiOutlineCamera } from "react-icons/ai"
import avatarIcon from "../../../public/assets/avatar.png"
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"

type Props = {
  avatar: string | null;
  user: any;
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {

  const [name, setName] = useState(user && user.name)
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
  const [loadUser, setLoadUser] = useState(false);
  const { } = useLoadUserQuery(undefined, { skip: true ? false : true })
  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result
        updateAvatar(
          avatar,
        )
      }
    }
    fileReader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (isSuccess) setLoadUser(true)
    if (error) console.log(error)

  }, [isSuccess])

  const handleSubmit = async (e: any) => {
    console.log('Submit')
  }


  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            // src={avatarIcon}
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[primary] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Nome Completo</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37A39A] text-center dark:text-[#FFF] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileInfo