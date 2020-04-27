
function objGenerator(num) {
    let arrayOfObjs = [];

    for (let i = 0; i < num; i++) {
        arrayOfObjs.push(
            {
                id: i.toString(),
                title: "Job Title " + i.toString(),
                field1: "need to restock",
                field2: "faster shipping",
                field3: "I can open earlier",
            }
        )
    }

    return arrayOfObjs;
}


export default function ConversationCards(props) {

    let objArray = objGenerator(props.cardNumber);

    return(
        
        <Container>
            <Row>

                <BuildCards array={ objArray } />
            
            </Row>



        </Container>

    )
}