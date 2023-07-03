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

const WarrantyCoupon = ({ lead }) => {
  console.log("lead: ", lead.attributes?.income);
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
              ГАРАНТИЙНЫЙ ТАЛОН № {lead?.attributes?.order_number}
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
                  Тип техники:
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
                  Произведенные работы:
                </Text>
                <Text style={{ flexBasis: 300, padding: 3 }}>
                  {lead.attributes?.income.map((item, index) =>
                    index !== lead.length - 1 ? item.title + ", " : item.title
                  )}
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
                  Срок гарантийной поддержки:
                </Text>
                <Text
                  style={{
                    flexBasis: 300,
                    padding: 3,
                    borderBottom: "1px solid #000",
                  }}
                >
                  {lead.attributes.correct_info.defect_tag || "Не заполнено"}
                </Text>
              </View>
            </View>
            <Text style={styles.paragraph}>
              Условия предоставления гарантии
            </Text>
            <Text style={styles.paragraph}>
              1.Гарантийный ремонт оборудования проводится при предъявлении
              клиентом полностью заполненного гарантийного талона.
            </Text>
            <Text style={styles.paragraph}>
              2.Доставка оборудования, подлежащего гарантийному ремонту, в
              сервисную службу осуществляется клиентом самостоятельно и за свой
              счет, если иное не оговорено в дополнительных письменных
              соглашениях.{" "}
            </Text>
            <Text style={styles.paragraph}>
              3.Гарантийные обязательства не распространяются на материалы и
              детали, считающиеся расходуемыми в процессе эксплуатации. Условия
              прерывания гарантийных обязательств{" "}
            </Text>
            <Text style={styles.paragraph}>
              Гарантийные обязательства могут быть прерваны в следующих случаях:{" "}
            </Text>
            <Text style={styles.paragraph}>
              1.Несоответствие серийного номера предъявляемого на гарантийное
              обслуживание оборудования серийному номеру, указанному в
              гарантийном талоне и/или других письменных соглашениях.{" "}
            </Text>
            <Text style={styles.paragraph}>
              2.Наличие явных или скрытых механических повреждений оборудования,
              вызванных нарушением правил транспортировки, хранения или
              эксплуатации.{" "}
            </Text>
            <Text style={styles.paragraph}>
              3.Выявленное в процессе ремонта несоответствие Правилам и условиям
              эксплуатации, предъявляемым к оборудованию данного типа.6-{" "}
            </Text>
            <Text style={styles.paragraph}>
              4.Повреждение контрольных этикеток и пломб (если таковые имеются).{" "}
            </Text>
            <Text style={styles.paragraph}>
              5.Наличие внутри корпуса оборудования посторонних предметов,
              независимо от их природы, если возможность подобного не оговорена
              в технической документации и Инструкциях по эксплуатации.{" "}
            </Text>
            <Text style={styles.paragraph}>
              6.Отказ оборудования, вызванный воздействием факторов
              непреодолимой силы и/или действиями третьих лиц.{" "}
            </Text>
            <Text style={styles.paragraph}>
              7.Установка и запуск оборудования несертифицированным персоналом,
              в случаях, когда участие при установке и запуске
              квалифицированного персонала прямо оговорено в технической
              документации или других письменных соглашениях.
            </Text>
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

export default WarrantyCoupon;
