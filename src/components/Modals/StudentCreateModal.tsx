
import { Modal, Input, DatePicker } from 'antd';

function StudentCreateModal({ isModalOpen, handleOk, handleCancel }) {

   

    return(
        <>
            <Modal title="Öğrenci Ekle" open={isModalOpen}  onOk={handleOk} onCancel={handleCancel}>
                <label htmlFor=""></label>
                <div>
                    <Input type="text" placeholder='İsim'/>
                    <Input type="text" placeholder='Soyisim'/>
                    <div>
                        <DatePicker placeholder='Doğum Tarihi' needConfirm/>
                    </div>
                </div>
                
            </Modal>
        </>
    )
}

export default StudentCreateModal;
