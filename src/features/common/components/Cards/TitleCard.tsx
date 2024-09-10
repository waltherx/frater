import Subtitle from "../Typography/Subtitle"


interface TitleCardProps {
  title: string;
  children: React.ReactNode;
  topMargin?: string;
  TopSideButtons?: React.ReactNode;
}

function TitleCard({ title, children, topMargin, TopSideButtons }: TitleCardProps) {
  return (
    <div className={"card w-full p-6 bg-base-100 shadow-xl " + (topMargin || "mt-6")}>

      {/* Title for Card */}
      <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
        <div>
          {title}
          {TopSideButtons ? (
            <div className="inline-block float-right">
              {TopSideButtons}
            </div>) : null}
        </div>
      </Subtitle>

      <div className="divider mt-2"></div>

      {/** Card Body */}
      <div className='h-full w-full pb-6 bg-base-100'>
        {children}
      </div>
    </div>
  )
}


export default TitleCard