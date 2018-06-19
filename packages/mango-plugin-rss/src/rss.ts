import Vue from 'vue'

export default new Vue({
  template: `
    <channel>
      <title>Axel Springer - Presseinformationen</title>
      <link>http://www.axelspringer.de</link>
      <language>DE</language>
      <image>
          <url>http://www.axelspringer.de/img/axel_springer_logo.png</url>
          <title>Axel Springer - Presseinformationen</title>
          <link>http://www.axelspringer.de</link>
      </image>
      <link rel="hub"  href="http://pubsubhubbub.appspot.com" xmlns="http://www.w3.org/2005/Atom" />
      <link rel="self" href="http://www.axelspringer.de/rss/cw_rss_pm_de_93379.html" xmlns="http://www.w3.org/2005/Atom" />
      <description>Die neuesten Presseinformationen von Axel Springer</description>
      <item>
        <title>title</title>
        <description><![CDATA[description]]></description>
        <content:encoded><![CDATA[content]]></content:encoded>
        <link>link</link>
        <guid>guid</guid>
        <pubDate>pubDate</pubDate>
        <enclosure url="url"></enclosure>
      </item>
    </channel>
  `
})
