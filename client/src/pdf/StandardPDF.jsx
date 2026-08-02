import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontFamily: "Times-Roman",
        fontSize: 10.5,
        lineHeight: 1.45,
    },

    header: {
        textAlign: "center",
        marginBottom: 16, // improved spacing
    },

    name: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 14, // added spacing
    },

    contact: {
        fontSize: 9.5,
        marginTop: 2,
    },

    section: {
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 2,
    },

    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginBottom: 6,
    },

    text: {
        fontSize: 10,
        marginBottom: 2,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    bold: {
        fontWeight: "bold",
    },

    bullet: {
        marginLeft: 12,
        fontSize: 10,
    }
});

const StandardPDF = ({ data }) => {
    const { personalInfo, summary, skills, education, experience, projects } = data;

    // ✅ Clean header formatter
    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.linkedin,
        personalInfo.github,
    ].filter(Boolean);

    const contactLine = contactItems
        .map((item, index) =>
            index !== contactItems.length - 1 ? `${item}   |   ` : item
        )
        .join("");

    return (
        <Page size="A4" style={styles.page}>

            {/* ───── HEADER ───── */}
            <View style={styles.header}>
                <Text style={styles.name}>{personalInfo.name}</Text>
                <br/>
                <br/>
                <br/>
                <Text style={styles.contact}>{contactLine}</Text>
            </View>

            {/* ───── SUMMARY ───── */}
            {summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <View style={styles.divider} />
                    <Text style={styles.text}>{summary}</Text>
                </View>
            )}

            {/* ───── SKILLS ───── */}
            {skills?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.divider} />
                    <Text style={styles.text}>{skills.join(" • ")}</Text>
                </View>
            )}

            {/* ───── EXPERIENCE ───── */}
            {experience?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    <View style={styles.divider} />

                    {experience.map((exp, i) => (
                        <View key={i} style={{ marginBottom: 8 }}>

                            <View style={styles.row}>
                                <Text>
                                    <Text style={styles.bold}>{exp.title}</Text>
                                    {exp.company && ` — ${exp.company}`}
                                </Text>

                                <Text>
                                    {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                                    {exp.location ? ` | ${exp.location}` : ""}
                                </Text>
                            </View>

                            {exp.bullets?.map((b, j) => (
                                <Text key={j} style={styles.bullet}>• {b}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            )}

            {/* ───── EDUCATION ───── */}
            {education?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <View style={styles.divider} />

                    {education.map((edu, i) => (
                        <View key={i} style={{ ...styles.row, marginBottom: 6 }}>
                            <Text>
                                <Text style={styles.bold}>{edu.institution}</Text>
                                {"\n"}
                                {[edu.degree, edu.field].filter(Boolean).join(", ")}
                                {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                            </Text>

                            <Text>
                                {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                            </Text>
                        </View>
                    ))}
                </View>
            )}

            {/* ───── PROJECTS (FIXED) ───── */}
            {projects?.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Projects</Text>
                    <View style={styles.divider} />

                    {projects.map((proj, i) => (
                        <View key={i} style={{ marginBottom: 8 }}>

                            {/* Title */}
                            <Text style={styles.bold}>{proj.name}</Text>

                            {/* Tech */}
                            {proj.tech && (
                                <Text style={styles.text}>{proj.tech}</Text>
                            )}

                            {/* Link */}
                            {proj.link && (
                                <Text style={[styles.text, { fontSize: 9 }]}>
                                    {proj.link}
                                </Text>
                            )}

                            {/* Description */}
                            {proj.description && (
                                <Text style={styles.text}>{proj.description}</Text>
                            )}

                        </View>
                    ))}
                </View>
            )}

        </Page>
    );
};

export default StandardPDF;