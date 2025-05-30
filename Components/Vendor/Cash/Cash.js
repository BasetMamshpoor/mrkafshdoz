import { Card, CardBody, Tab, Tabs } from "@heroui/react";
// import Discount from "./Discount";
import Shipping from "./Shipping";

const Cash = () => {
    return (
        <>
            <div className="w-full flex flex-col">
                <Tabs aria-label="Options" className="border-b pb-3">
                    <Tab key="shipping" title="هزینه ارسال">
                        <Card style={{ boxShadow: 'none' }}>
                            <CardBody>
                                <Shipping />
                            </CardBody>
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default Cash;