"""@plugin ShellshockTesterPlugin
This file contains classes for plugin, which tests server(s) for vulnerability CVE-2014-6271.

@author: Bc. Pavel Soukup
"""

from operator import attrgetter
from xml.etree.ElementTree import Element

import socket, subprocess, struct, fcntl, httplib, time
import ssl

from sslyze.plugins import plugin_base
from sslyze.plugins.plugin_base import PluginResult

class ShellshockTesterPlugin(plugin_base.PluginBase):
	"""class ShellshockTesterPlugin
	
	This class inherited from abstract class PluginBase. Instance of this class tests server for vulnerability CVE-2014-6271 and makes decision if the server is vulnerable.
	"""
	interface = plugin_base.PluginInterface(
		"ShellshockTesterPlugin",
		"Tests the server(s) for Shellshock vulnerability (CVE-2014-6271)")
	interface.add_command(
		command="shellshock",
		help="Tests server for vulnerability CVE-2014-6271")
	interface.add_option(
		option="http_path",
		help="Specify path which following the domain name or ip address. Default is set to /",
		dest="path")
	def process_task(self, server_connectivity_info, plugin_command, option_dict=None):
		if option_dict and 'path' in option_dict.keys():
			path = str(option_dict['path'])
		else:
			path = '/'
		if server_connectivity_info.port == 80:
			conn = httplib.HTTPConnection(server_connectivity_info.ip_address,server_connectivity_info.port)
		elif server_connectivity_info.port == 443:
			conn = httplib.HTTPSConnection(server_connectivity_info.ip_address,server_connectivity_info.port,context=ssl._create_unverified_context())
		else:
			raise ValueError("ShellshockTesterPlugin: Can\'t make test for this port {0}".format(server_connectivity_info.port))
		
		try:
			conn.connect()
		except Exception as e:
			raise ValueError("ShellshockTesterPlugin: Connection error for port {0}. {1}".format(server_connectivity_info.port,str(e)))
		else:
			conn.request("GET", path, "", {'User-Agent': '() { :; }; echo; echo Vulnerable to CVE-2014-6271'})
			response = conn.getresponse()

		return ShellshockTesterResult(server_connectivity_info, plugin_command, option_dict, self.is_vulnerable(response))

	def is_vulnerable(self, message):
		"""Returns true if value in parameter message contains string 'Vulnerable to CVE-2014-6271', otherwise returns false
		"""
		msg = message.read()
		return 'Vulnerable to CVE-2014-6271' in msg

class ShellshockTesterResult(PluginResult):
	"""class ShellshockTesterResult
	
	This class is subclass PluginResult. It's used to return result of test, which is made in class ShellshockTesterPlugin.
	"""

	def __init__(self, server_connectivity_info, plugin_command, option_dict, vulnerable):
		super(ShellshockTesterResult, self).__init__(server_connectivity_info,plugin_command,option_dict)
		self.vulnerable = vulnerable

	COMMAND_TITLE = 'Vulnerability CVE-2014-6271'
	def as_text(self):
		shellshock_txt = "VULNERABLE - This server is vulnerable to Shellshock attack." \
			if self.vulnerable \
			else "OK - Not vulnerable to Shellshock attack"
		txt_output = [self.PLUGIN_TITLE_FORMAT(self.COMMAND_TITLE)]
		txt_output.append(self.FIELD_FORMAT("", shellshock_txt))
		return txt_output

	def as_xml(self):
		xml_output = Element(self.plugin_command, title=self.COMMAND_TITLE)
		xml_output.append(Element('vulnerable', isVulnerable=str(self.vulnerable)))
		return xml_output
