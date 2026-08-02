import { Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    lineHeight: 1.4,
  },

  // LEFT SIDEBAR
  sidebar: {
    width: "30%",
    backgroundColor: "#2d2d2d",
    color: "#fff",
    padding: 20,
  },

  sidebarHeading: {
    fontSize: 8.5,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    paddingBottom: 2,
  },

  sidebarText: {
    fontSize: 8.5,
    color: "#ddd",
    marginBottom: 2,
  },

  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },

  // RIGHT MAIN
  main: {
    width: "70%",
    padding: 20,
    backgroundColor: "#fff",
    color: "#000",
  },

  mainHeading: {
    fontSize: 9,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1.5,
    borderBottomColor: "#333",
    marginBottom: 4,
    paddingBottom: 2,
  },

  section: {
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bold: {
    fontWeight: "bold",
  },

  bullet: {
    marginLeft: 10,
    fontSize: 9,
  },

  small: {
    fontSize: 8,
    color: "#555",
  },

  link: {
    fontSize: 8.5,
    color: "#000",            // ✅ black text
    textDecoration: "none",   // ✅ no underline
    marginTop: 2,
  }

});

const CompactPDF = ({ data }) => {
  const { personalInfo, summary, skills, education, experience, projects } = data;

  return (
    <Page size="A4" style={styles.page}>

      {/* ── SIDEBAR ── */}
      <View style={styles.sidebar}>

        <Text style={styles.name}>{personalInfo.name}</Text>

        <View style={styles.section}>
          <Text style={styles.sidebarHeading}>Contact</Text>
          {personalInfo.email && <Text style={styles.sidebarText}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.sidebarText}>{personalInfo.phone}</Text>}
          {personalInfo.linkedin && <Text style={styles.sidebarText}>{personalInfo.linkedin}</Text>}
          {personalInfo.github && <Text style={styles.sidebarText}>{personalInfo.github}</Text>}
        </View>

        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sidebarHeading}>Skills</Text>
            {skills.map((s, i) => (
              <Text key={i} style={styles.sidebarText}>• {s}</Text>
            ))}
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sidebarHeading}>Education</Text>

            {education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold", fontSize: 8.5 }}>
                  {edu.institution}
                </Text>

                <Text style={styles.sidebarText}>
                  {[edu.degree, edu.field].filter(Boolean).join(", ")}
                </Text>

                <Text style={{ fontSize: 7.5, color: "#aaa" }}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                  {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ── MAIN CONTENT ── */}
      <View style={styles.main}>

        {summary && (
          <View style={styles.section}>
            <Text style={styles.mainHeading}>Profile</Text>
            <Text>{summary}</Text>
          </View>
        )}

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainHeading}>Experience</Text>

            {experience.map((exp, i) => (
              <View key={i} style={{ marginTop: 6 }}>

                <View style={styles.row}>
                  <Text>
                    <Text style={styles.bold}>{exp.title}</Text>
                    {exp.company ? ` · ${exp.company}` : ""}
                  </Text>

                  <Text style={styles.small}>
                    {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </Text>
                </View>

                {exp.bullets?.map((b, j) => (
                  <Text key={j} style={styles.bullet}>• {b}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* ✅ UPDATED PROJECT SECTION */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainHeading}>Projects</Text>

            {projects.map((proj, i) => (
              <View key={i} style={{ marginTop: 8 }}>

                {/* Title */}
                <Text style={styles.bold}>{proj.name}</Text>

                {/* Tech Stack */}
                {proj.tech && (
                  <Text style={styles.small}>
                    {proj.tech}
                  </Text>
                )}

                {/* Clickable Link (clean) */}
                {proj.link && (
                 <Link src={proj.link} style={styles.link}>
                    {proj.link}
                  </Link>
                )}

                {/* ✅ DESCRIPTION */}
                {proj.description && (
                  <Text style={{ marginTop: 4 }}>
                    {proj.description}
                  </Text>
                )}

              </View>
            ))}
          </View>
        )}

      </View>
    </Page>
  );
};

export default CompactPDF;