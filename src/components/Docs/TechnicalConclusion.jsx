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

const TechnicalConclusion = ({ lead }) => {
  const nowDate = new Date().toLocaleDateString("ru-RU");

  const masterFio = lead.attributes.users_permissions_user.data?.attributes
    ?.name
    ? lead.attributes.users_permissions_user.data?.attributes?.name +
      " " +
      lead.attributes.users_permissions_user.data?.attributes?.last_name
    : null;

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
              Акт технического заключения № {lead?.attributes?.order_number}
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: "100%",
                    padding: 3,
                    width: 100,
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Аппарат
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
                  Торговая марка:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.correct_info.brand}
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
                  Место пребывания:
                </Text>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderBottom: "1px solid #000",
                  }}
                ></Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: "100%",
                    padding: 3,
                    width: 100,
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Результат диагностики
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
                  Заявленный владельцем дефект:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.correct_info.defect}{" "}
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
                  Продиагностировал (Ф.И.О инженера):
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.correct_info.brand}
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
                  Заключение:
                </Text>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderBottom: "1px solid #000",
                  }}
                ></Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: "100%",
                    padding: 3,
                    width: 100,
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Владелец аппарата
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
                  Ф.И.О:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.client?.data?.attributes?.name}
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
                  Адрес:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes.client?.data?.attributes?.address}
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
                  Телефон:
                </Text>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderBottom: "1px solid #000",
                  }}
                >
                  {lead.attributes.client?.data?.attributes?.phone}
                </Text>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: "100%",
                    padding: 3,
                    width: 100,
                    textAlign: "center",
                    fontSize: 12,
                  }}
                >
                  Доверенное лицо
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
                  ООО «Гарант»
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}></Text>
              </View>
              <View style={styles.tableRow}>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderRight: "1px solid #000",
                  }}
                >
                  Ф.И.О Инженера:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>{masterFio}</Text>
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
                  Дата выдачи акта:
                </Text>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderBottom: "1px solid #000",
                  }}
                >
                  {nowDate}
                </Text>
              </View>
            </View>
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

export default TechnicalConclusion;
