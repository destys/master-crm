import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  Font,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

// Загрузка кастомного шрифта
Font.register({
  family: "CustomFont",
  src: "/fonts/Roboto-Regular.ttf", // Замените на фактический URL или путь к файлу шрифта
});

const ActOfCompleted = ({ lead }) => {
  console.log("lead: ", lead);

  let totalPrice = 0;
  let performedWork = "";
  const allIncomes = lead.attributes?.income;

  if (allIncomes.length) {
    allIncomes.forEach((item, index) => {
      totalPrice += item.amount;
      index !== allIncomes.length - 1
        ? (performedWork += item.title + ", ")
        : (performedWork += item.title);
    });
  }

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#fff",
      fontFamily: "CustomFont",
      fontSize: 7,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      flexDirection: "row",
      margin: 10,
      padding: 10,
      justifyContent: "space-between",
    },
    logo: {
      width: 150,
      objectFit: "contain",
    },
    seal: {
      width: 200,
      height: 200,
      objectFit: "contain",
      position: "absolute",
      bottom: -75,
      left: "50%",
    },
    sign: {
      width: 200,
      height: 200,
      objectFit: "contain",
      position: "absolute",
      bottom: -78,
      left: "72%",
    },
    paragraph: {
      marginBottom: 5,
    },
    table: {
      flexDirection: "column",
      marginBottom: 20,
    },
    tableRow: {
      flexDirection: "row",
      border: "1px solid #000",
      borderBottom: 0,
    },
    footer: {
      margin: 10,
      marginTop: 0,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 15,
      marginBottom: 50,
    },
  });

  return (
    <PDFViewer width={600} height="600" className="w-full">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={"/images/logo.png"} style={styles.logo} />
            <View style={{ flexBasis: 200, textAlign: "right" }}>
              <Text style={{ marginBottom: 5 }}>ООО “Гарант”</Text>
              <Text style={{ marginBottom: 5 }}>ИНН 4705097126</Text>
              <Text style={{ marginBottom: 5 }}>КПП 470501001</Text>
              <Text style={{ marginBottom: 5 }}>
                Адрес: г. Санкт-Петербург, 13 линия{" "}
              </Text>
              <Text style={{ marginBottom: 5 }}>
                Васильевского Острова д.36
              </Text>
              <Text style={{ marginBottom: 5 }}>
                Телефон: 8 (812)–220 -70 -70
              </Text>
              <Text style={{ marginBottom: 5 }}>spbgarant.ru</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text
              style={{
                textAlign: "center",
                marginBottom: "20",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              Акт выполненных работ № {lead?.attributes?.order_number}
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderRight: "1px solid #000",
                  }}
                >
                  Аппарат:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.correct_info.device}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderRight: "1px solid #000",
                  }}
                >
                  Модель:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.correct_info.model}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderRight: "1px solid #000",
                  }}
                >
                  Серийный номер:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.correct_info.serial_number}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderRight: "1px solid #000",
                    borderBottom: "1px solid #000",
                  }}
                >
                  Дата выдачи:
                </Text>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderBottom: "1px solid #000",
                  }}
                >{lead.attributes.correct_info.not_coordinate}</Text>
              </View>
            </View>
            <Text style={styles.title}>Описание работ: {performedWork}</Text>
            <Text style={styles.title}>Стоимость работ: {totalPrice} руб</Text>
            <Text style={styles.title}>Итого к плате: {totalPrice} руб</Text>
          </View>
          <View style={styles.footer}>
            <Text style={{ marginBottom: 20 }}>
              С условиями сервисного обслуживание ознакомлен:
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Text>Заказчик:____________________/____________</Text>
              <Image src={"/images/seal.png"} style={styles.seal} />
              <Image src={"/images/sign.png"} style={styles.sign} />
              <Text>Исполнитель:____________________/____________</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ActOfCompleted;
