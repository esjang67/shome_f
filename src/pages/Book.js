import Accordion from 'react-bootstrap/Accordion';

function Book(){
  return (
    <div className="Book">

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>전집 찾기</Accordion.Header>
            <Accordion.Body>
              내용
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
          
    </div>
  )
}

export default Book;