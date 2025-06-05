

type MessageProps = {
    message: string
}

export const Error = ({ message }: MessageProps) => {
  return (
    <div className="bg-red-400 w-full px-2 py-1 text-white rounded-md uppercase font-bold">
        {message}
    </div>
  )
}
