import Card from 'react-bootstrap/Card';

const EmotionCard = ({ emotionWord, emotionClicked }) => {
    return (
        <div onClick={() => emotionClicked(emotionWord)}>
            <Card style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 100,
                minWidth: 120,
                // padding: 30,
                margin: "20px",
                color: "black",
                textAlign: "center",
                borderRadius: 5
            }}>
                <Card.Body>
                    <Card.Text style={{ textAlign: "center" }}>
                        {emotionWord}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EmotionCard;