import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    pdf,
    Font, Image
} from "@react-pdf/renderer";

Font.register({
    family: "Vazir",
    src: "/Fonts/ttf/IRANYekanWebRegular.ttf",
    fontStyle: "normal",
    fontWeight: "normal",
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
        fontFamily: "Vazir",
        direction: "rtl",
    },
    header: {
        textAlign: "center",
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    image: {
        width: '200px',
        height: 'auto',
        margin: "0 auto",
        marginBottom: 10,
    },
    qr: {
        width: '100px',
        height: 'auto',
        margin: "0 auto",
        marginBottom: 10,
    },
    text: {
        textAlign: "right",
        fontSize: 10,
        fontWeight: "bold",
    },
    text2: {
        textAlign: "right",
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 20
    },
    texts: {
        display: 'flex',
        flexDirection: 'column',
    },
    table: {
        marginTop: 20,
        direction: "rtl",
    },
    tableRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottom: "1px solid #ccc",
        paddingVertical: 10,
    },
    tableCell: {
        fontSize: 12,
        fontWeight: "bold",
    },
});

const MyPDFContent = ({data}) => (
    <Document>
        <Page size="A5" style={styles.page}>
            <Text style={styles.header}>امیدوارم بهترین تجربه خریدتون باشه</Text>

            <Image style={styles.image} src="/Images/logo.png"/>
            <Text style={styles.header}>mrkafshdoz.com</Text>

            <View style={styles.texts}>
                <Text style={styles.text2}>فرستنده: آقای کقشدوز</Text>
                <Text style={styles.text2}>گیرنده: {data.address.name} _ {data.address.cellphone}</Text>
                <Text style={{...styles.text, marginBottom: 10}}>آدرس
                    گیرنده: {data.address.province} - {data.address.city} - {data.address.address}</Text>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end',}}>
                    <View>
                        <Image style={styles.qr}
                               src={`https://quickchart.io/qr?text=mrkafshdoz.com/directions?latlng=${data.address.latitude},${data.address.longitude}`}/>
                        <Text>جهت مسیریابی اسکن کنید</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>
                            <Text>پلاک: </Text>{data.address.number}
                            <Text> | </Text>
                            <Text>واحد: </Text>{data.address.unit ?? 0}
                        </Text>
                        <Text style={styles.text}>
                            <Text>کدپستی: </Text>{data.address.postalcode}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.table}>
                {data.orderItems.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.text}>تعداد: {item.quantity}</Text>
                        <Text style={styles.text}>{item.size}</Text>
                        <Text style={styles.text}>{item.color}</Text>
                        <Text style={styles.text}>{item.product.name}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

const PdfOnButtonClick = ({data}) => {

    const generatePdf = async () => {
        const blob = await pdf(<MyPDFContent data={data}/>).toBlob();
        const url = URL.createObjectURL(blob);

        const printWindow = window.open(url);
        printWindow.onload = () => {
            printWindow.print();
            printWindow.onafterprint = () => {
                printWindow.close();
                URL.revokeObjectURL(url);
            };
        };
    };

    return (
        <button onClick={generatePdf} className="!bg-green-600 text-white px-3 py-2 rounded">PDF</button>
    );
};

export default PdfOnButtonClick;
