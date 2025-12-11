interface Props {
  text: string
}

const Tech = ({ text }: Props) => {
  return (
    <div className="mr-3 text-sm font-medium text-sky-500 uppercase hover:text-sky-600 dark:hover:text-sky-400">
      {text.split(' ').join('-')}
    </div>
  )
}

export default Tech
