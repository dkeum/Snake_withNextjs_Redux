

type ScoreProps = {
    gameScore: number
} 

const ScoreCard = ({gameScore}: ScoreProps) => {
    return (
        <h2 className="flex justify-center my-5 text-2xl font-medium ">Current Score is: {gameScore}</h2>
    );
}

export default ScoreCard;