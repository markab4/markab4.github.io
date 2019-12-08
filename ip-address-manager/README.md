# IP Address Manager

This repo provides an interface for assigning and managing IP addresses for the various types and is live [here.](https://markab4.github.io/ip-address-manager/IPAddressManager.html)

### Technologies Used
* HTML
* CSS
* JavaScript

## Background
Various models of IP addressing are utilized today, in particular, the 32-bit IPv4 and 128-bit IPv6 schemes. IPv4 is
further divided into five classes: A, B, C, D, E, which differ both function as well as division between prefix and suffix, as
well as a “classless” model which has an “arbitrary” boundary (specified by a “mask”) between prefix and suffix.

This repo assumes these are all “public addresses” that need to be globally unique – at least in conjunction with the network
mask – as opposed to private addresses. 

## Description
Through the website's user interface, the user enters several pieces of information: 
* The choice of IPv4 or IPv6
* The choice of classful (for IPv4) or classless. For classless addressing, the address manager determines the subnet mask based on the number of host addresses requested. 
* For classful addressing, the choice of class A-E
* For classless, the mask that determines the boundary between prefix and suffix for IPv4, or between the global prefix and subnet prefix for IPv6
* For IPv6, the choice whether zero compression should be applied to colon-hex
* The choice of how many IP addresses are required by the user. These addresses are all on the same network, meaning they share the same prefix.

The IP addresses are displayed both as binary and in dotted decimal or colon hex. The latter are the conventional notations, and the binary is visually easier
to parse