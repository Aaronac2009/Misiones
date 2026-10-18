import QuestSelect from "./QuestSelect"

function QuestBar({misiones, onCargarMision}){
    return(
        <div className="quest-bar">
            {misiones.map(mision => <QuestSelect mision={mision} onCargarMision={onCargarMision}></QuestSelect>)}
        </div>
    )
}

export default QuestBar