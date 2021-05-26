<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <h2 style="color: coral">Contact College</h2>
                <xsl:apply-templates />
            </body>
        </html>
    </xsl:template>

    <xsl:template match="CollegeData">
        <p>
            <xsl:apply-templates select="collegeName" />
            <xsl:apply-templates select="add" />
            <xsl:apply-templates select="Description" />
            <xsl:apply-templates select="email" />
            <xsl:apply-templates select="Address" />
        </p>
    </xsl:template>

    <xsl:template match="collegeName">
Institute Name: <span >
        <xsl:value-of select="." />
    </span>
    <br />
</xsl:template>

<xsl:template match="add">
    <span >
        <xsl:value-of select="." />
    </span>
    <br />
</xsl:template>

<xsl:template match="Description">
Description: <span >
    <xsl:value-of select="." />
</span>
<br />
</xsl:template>

<xsl:template match="email">
Email ID: <span>
<xsl:value-of select="." />
</span>
<br />
</xsl:template>

<xsl:template match="Address">
Address: <span>
<xsl:value-of select="." />
</span>
<br />
</xsl:template>

</xsl:stylesheet>