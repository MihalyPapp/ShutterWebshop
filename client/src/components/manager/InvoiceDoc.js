import React from 'react';
import {Document, Page, Text, View} from "@react-pdf/renderer";


const InvoiceDoc = ({order}) => {
    return (
        <Document>
            <Page size="A4">
                <View>
                    <Text>Invoice</Text>
                    <Text>For: {order.username}</Text>
                    {order.cartItems.map(item => {
                        return (
                            <Text key={JSON.stringify(item)}>{item.shutter.name}, pcs:{item.quantity}, price:{item.price}</Text>
                        );
                    })}
                    <Text>Total price: {order.price}</Text>
                </View>
            </Page>
        </Document>
    )
};

export default InvoiceDoc;