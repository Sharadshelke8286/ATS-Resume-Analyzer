import { Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 50,
    paddingHorizontal: 45,
    paddingBottom: 40,
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    lineHeight: 1.5,
  },

  /* HEADER */
  header: {
    marginBottom: 18,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 6, // ✅ added spacing below name
  },

  contact: {
    fontSize: 10,
    color: "#444",
    marginTop: 6,
    marginBottom: 6, // ✅ added spacing below contact
  },

  divider: {
    height: 2,
    backgroundColor: "#000",
    marginTop: 10,
  },

  /* SECTION */
  section: {
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: "#000",
    paddingBottom: 3,
  },

  skillText: {
    fontSize: 10,
    marginTop: 4,
    lineHeight: 1.6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  jobTitle: {
    fontWeight: "bold",
  },

  meta: {
    fontSize: 9.5,
    color: "#444",
  },

  bullet: {
    marginLeft: 12,
    fontSize: 10,
    marginTop: 2,
  },

  projectTitle: {
    fontWeight: "bold",
    fontSize: 10.5,
  },

  // ✅ clickable link style
  projectLink: {
    fontSize: 9,
    color: "#000",       // ✅ normal black text
    textDecoration: "none", // ✅ remove underline (important)
    marginTop: 2,
  }
});

const ModernPDF = ({ data }) => {
  const { personalInfo, summary, skills, education, experience, projects } = data;

  return (
    <Page size="A4" style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.name}</Text>

        <Text style={styles.contact}>
          {[personalInfo.email, personalInfo.phone, personalInfo.linkedin, personalInfo.github]
            .filter(Boolean)
            .join(" | ")}
        </Text>

        <View style={styles.divider} />
      </View>

      {/* SUMMARY */}
      {summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text>{summary}</Text>
        </View>
      )}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <Text style={styles.skillText}>
            {skills.join(" • ")}
          </Text>
        </View>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>

          {experience.map((exp, i) => (
            <View key={i} style={{ marginTop: 6 }}>

              <View style={styles.row}>
                <Text>
                  <Text style={styles.jobTitle}>{exp.title}</Text>
                  {exp.company ? `, ${exp.company}` : ""}
                </Text>

                <Text style={styles.meta}>
                  {[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
                </Text>
              </View>

              {exp.location && (
                <Text style={styles.meta}>{exp.location}</Text>
              )}

              {exp.bullets?.map((b, j) => (
                <Text key={j} style={styles.bullet}>• {b}</Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>

          {education.map((edu, i) => (
            <View key={i} style={{ marginTop: 6 }}>

              <View style={styles.row}>
                <Text style={styles.jobTitle}>{edu.institution}</Text>

                <Text style={styles.meta}>
                  {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                </Text>
              </View>

              <Text style={styles.meta}>
                {[edu.degree, edu.field].filter(Boolean).join(", ")}
                {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>

          {projects.map((proj, i) => (
            <View key={i} style={{ marginTop: 8 }}>

              {/* Title */}
              <Text style={styles.projectTitle}>{proj.name}</Text>

              {/* Tech Stack */}
              {proj.tech && (
                <Text style={styles.meta}>
                  {proj.tech}
                </Text>
              )}

              {/* Clickable Link */}
              {proj.link && (
                <Link src={proj.link} style={styles.projectLink}>
                  {proj.link}
                </Link>
              )}

              {/* ✅ DESCRIPTION (NOT BULLETS) */}
              {proj.description && (
                <Text style={{ marginTop: 4 }}>
                  {proj.description}
                </Text>
              )}

            </View>
          ))}
        </View>
      )}

    </Page>
  );
};

export default ModernPDF;